const PropertyService = require('../../property/services/PropertyService');
const {User, Image} = require('../../../database/initializer');
const passwordToken = require('../../../redis/password-token');
const bcrypt = require('bcrypt');
const PasswordTokenError = require('../../../errors/PasswordTokenError');
const EmptyDatabaseError = require('../../../errors/EmptyDatabaseError');
const InvalidParamError = require('../../../errors/InvalidParamError');
class UserService {
  async create(user) {
    const bcryptSalt = 10;
    user.password = await bcrypt.hash(user.password, bcryptSalt);
    const createdUser = await User.create(user);
    return createdUser;
  }

  async getAll() {
    const users = await User.findAll();
    if (!users) {
      throw new EmptyDatabaseError('Ainda não existem usuários cadastrados');
    }
    return users;
  }

  async get(id) {
    const user = await User.findByPk(id);
    if (!user) throw new InvalidParamError('Não existe um usuário com este ID');
    return user;
  }

  async getByEmail(email) {
    const user = await User.findOne({where: {email: email}});
    return user;
  }

  async getProperties(id) {
    const user = await User.findByPk(id);
    const properties = await user.getProperties({
      include: [{model: Image, as: 'Images'}],
    });
    return properties;
  }

  async updatePassword(userID, password) {
    const user = await User.findByPk(userID);
    if (!user) throw new InvalidParamError('Não existe um usuário com este ID');

    const PWDsAreEqual = await bcrypt.compare(password, user.password);
    if (PWDsAreEqual) {
      throw new InvalidParamError(
        'Sua nova senha deve ser diferente da sua anterior.',
      );
    }
    const bcryptSalt = 10;
    const newPassword = await bcrypt.hash(password, bcryptSalt);
    await user.update({password: newPassword});
  }

  async alter(id, body) {
    const user = await User.findByPk(id);
    if (!user) throw new InvalidParamError('Não existe um usuário com este ID');
    await user.update(body);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) throw new InvalidParamError('Não existe um usuário com este ID');
    const properties = await user.getProperties();
    for (const property of properties) {
      await PropertyService.delete(property.id);
    }
    await user.destroy();
  }

  async getUserByEmail(email) {
    const user = await User.findOne({where: {email: email}});
    return user;
  }

  async resetPassword(token, newPassword) {
    const email = await passwordToken.getEmail(token);
    if (email) {
      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);
      await User.update({password: hashedNewPassword}, {where: {email}});
      await passwordToken.removeToken(token);
    } else {
      throw new PasswordTokenError('O token de reset não existe ou expirou!');
    }
  }
}

module.exports = new UserService();
