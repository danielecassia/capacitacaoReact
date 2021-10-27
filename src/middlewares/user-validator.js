const InvalidParamError = require('../errors/InvalidParamError');
const {body} = require('express-validator');
const {validate} = require('./validate');
const {User} = require('../database/initializer');
const bcrypt = require('bcrypt');

const getValidations = (method) => {
  switch (method) {
    case 'register': {
      return [
        body('email')
          .exists()
          .withMessage('É necessário preencher o campo "email".')
          .isEmail()
          .withMessage('O email inserido não é válido')
          .custom((value) => {
            return User.findOne({where: {email: value}}).then((user) => {
              if (user) {
                return Promise.reject(
                  new InvalidParamError('O email inserido já está em uso.'),
                );
              }
              return Promise.resolve();
            });
          }),
        body('password')
          .exists()
          .withMessage('É necessário preencher o campo "senha".')
          .isStrongPassword()
          .withMessage(
            'Sua senha deve conter pelo menos 8 caracteres, ' +
              'com pelo menos um número, uma letra maiúscula e um caractér ' +
              'especial',
          )
          .custom((value, {req}) => {
            if (value != req.body.passwordConfirmation) {
              return Promise.reject(
                new InvalidParamError(
                  'Senha e confirmação de senha não coincidem.',
                ),
              );
            }
            return Promise.resolve();
          }),
        body('name')
          .exists()
          .withMessage('É necessário preencher o campo "nome".')
          .isAlpha('pt-BR', {ignore: ' '})
          .withMessage('O nome deve conter apenas letras'),
      ];
    }
    case 'login': {
      return [
        body('email')
          .exists()
          .withMessage('Por favor insira um email!')
          .isEmail()
          .withMessage('Por favor insira um email válido!'),
        body('password')
          .exists()
          .withMessage('Por favor insira uma senha')
          .notEmpty()
          .withMessage('Por favor insira uma senha'),
      ];
    }
    case 'changePassword': {
      return [
        body('email')
          .exists()
          .withMessage('Por favor insira um email!')
          .isEmail()
          .withMessage('Por favor insira um email válido!'),
        body('oldPassword')
          .exists()
          .withMessage('Por favor, insira sua antiga senha')
          .custom(async (value, {req}) => {
            const userID = req.user.id;
            const user = await User.findByPk(userID);
            const oldPassword = user.password;
            const passwordMatch = await bcrypt.compare(value, oldPassword);
            if (!passwordMatch) {
              return Promise.reject(
                new InvalidParamError('Insira sua senha antiga corretamente'),
              );
            }
            return Promise.resolve();
          }),
        body('newPassword')
          .exists()
          .withMessage('É necessário preencher o campo "senha".')
          .isStrongPassword()
          .withMessage(
            'Sua senha deve conter pelo menos 8 caracteres, ' +
              'com pelo menos um número, uma letra maiúscula e um caractér ' +
              'especial',
          )
          .custom((value, {req}) => {
            if (value !== req.body.newPasswordConfirmation) {
              return Promise.reject(
                new InvalidParamError(
                  'Senha e confirmação de senha não coincidem.',
                ),
              );
            }
            return Promise.resolve();
          }),
      ];
    }
    case 'update': {
      return [
        body('name')
          .optional()
          .isAlpha('pt-BR', {ignore: ' '})
          .withMessage('O nome deve conter apenas letras'),
        body('email')
          .optional()
          .isEmail()
          .withMessage('O email inserido não é válido')
          .custom((value) => {
            return User.findOne({where: {email: value}}).then((user) => {
              if (user) {
                return Promise.reject(
                  new InvalidParamError('O email inserido já está em uso.'),
                );
              }
              return Promise.resolve();
            });
          }),
      ];
    }
    case 'forgotPassword': {
      return [
        body('email')
          .exists()
          .withMessage('Por favor insira um email!')
          .isEmail()
          .withMessage('Por favor insira um email válido!'),
      ];
    }
    case 'resetPassword': {
      return [
        body('password')
          .exists()
          .withMessage('É necessário preencher o campo "nova senha".')
          .isStrongPassword()
          .withMessage(
            'Sua senha deve conter pelo menos 8 caracteres, ' +
              'com pelo menos um número, uma letra maiúscula e um caractér ' +
              'especial',
          )
          .custom((value, {req}) => {
            if (value != req.body.passwordConfirmation) {
              return Promise.reject(
                new InvalidParamError(
                  'Senha e confirmação de senha não coincidem.',
                ),
              );
            }
            return Promise.resolve();
          }),
      ];
    }
  }
};

module.exports = {
  userValidate: (method) => validate(getValidations(method)),
};
