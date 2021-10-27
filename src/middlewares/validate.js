const {validationResult} = require('express-validator');
const InvalidParamError = require('../errors/InvalidParamError');
const {delReqImages} = require('../middlewares/auth-middlewares');

function validate(validations) {
  return async (req, res, next) => {
    try {
      for (const validation of validations) {
        await validation.run(req);
      }
      const result = validationResult(req);
      if (!result.isEmpty()) {
        if (req.files) {
          await delReqImages(req);
        }
        throw new InvalidParamError(result.errors[0].msg);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {validate};
