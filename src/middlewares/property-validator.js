const {body} = require('express-validator');
const {validate} = require('./validate');

const getValidations = (method) => {
  switch (method) {
    case 'create': {
      return [
        body('name')
          .exists()
          .withMessage('É necessário preencher o campo "nome".')
          .isAlpha('pt-BR', {ignore: ' '})
          .withMessage('O nome deve conter apenas letras'),
        body('address')
          .exists()
          .withMessage('É necessário preencher o campo "endereço".'),
        body('type')
          .exists()
          .withMessage('É necessário preencher o campo "tipo".')
          .isIn(['Rent', 'Buy'])
          .withMessage('Sua propriedade deve ser do tipo "Rent" ou "Buy".'),
        body('price')
          .exists()
          .withMessage('É necessário preencher o campo "preço".')
          .isNumeric()
          .withMessage('O preço deve ser passado como um número.'),
        body('link')
          .optional()
          .isURL()
          .withMessage('O link deve ser uma URL válida.'),
        body('sellerPhone')
          .optional()
          .isMobilePhone()
          .withMessage(
            'O telefone do vendedor deve estar no formato de telefone.',
          ),
      ];
    }
    case 'update': {
      return [
        body('name')
          .optional()
          .isAlpha('pt-BR', {ignore: ' '})
          .withMessage('O nome deve conter apenas letras'),
        body('type')
          .optional()
          .isIn(['Rent', 'Buy'])
          .withMessage('Sua propriedade deve ser do tipo "Rent" ou "Buy".'),
        body('price')
          .optional()
          .isNumeric()
          .withMessage('O preço deve ser passado como um número.'),
        body('link')
          .optional()
          .isURL()
          .withMessage('O link deve ser uma URL válida.'),
        body('sellerPhone')
          .optional()
          .isMobilePhone()
          .withMessage(
            'O telefone do vendedor deve estar no formato de telefone.',
          ),
      ];
    }
  }
};

module.exports = {
  propertyValidate: (method) => validate(getValidations(method)),
};
