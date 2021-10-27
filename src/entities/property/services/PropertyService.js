const {Image, Property, User} = require('../../../database/initializer');
const InvalidParamError = require('../../../errors/InvalidParamError');
const {deleteImage} = require('../../../middlewares/imageHandler');
class PropertyService {
  async create(userID, property, images) {
    const createdProp = await Property.create(property);
    if (images.length > 0) {
      await this.addImages(createdProp.id, images);
    }
    const user = await User.findByPk(userID);
    await createdProp.setUser(user);
    return createdProp;
  }

  async addImages(id, images) {
    const property = await Property.findByPk(id);
    if (!property) {
      throw new InvalidParamError('Não existe um imóvel com este ID');
    }
    for (const image of images) {
      const img = await Image.create({id: image.id, path: image.filename});
      await img.setProperty(property);
    }
  }

  async getAll() {
    const props = await Property.findAll({
      include: [{model: Image, attributes: ['id', 'path']}],
    });
    if (!props) {
      throw new EmptyDatabaseError('Ainda não existem imóveis cadastrados');
    }
    return props;
  }

  async getByID(id) {
    const property = await Property.findByPk(id, {
      include: [{model: Image, attributes: ['id', 'path']}],
    });
    if (!property) {
      throw new InvalidParamError('Não existe um imóvel com este ID');
    }
    return property;
  }

  async update(id, newDetails) {
    const property = await Property.findByPk(id);
    if (!property) {
      throw new InvalidParamError('Não existe um imóvel com este ID');
    }
    const updatedPro = await property.update(newDetails);
    return updatedPro;
  }

  async removeImage(id) {
    const image = await Image.findByPk(id);
    if (!image) {
      throw new InvalidParamError('Não existe uma imagem com este ID');
    }
    await deleteImage(image.id);
    await image.destroy();
  }

  async delete(id) {
    const property = await Property.findByPk(id);
    const images = await property.getImages();
    for (const image of images) {
      await this.removeImage(image.id);
    }
    await property.destroy();
  }
}

module.exports = new PropertyService();
