const NotAuthorizedError = require('../errors/NotAuthorizedError');
const InvalidParamError = require('../errors/InvalidParamError');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const {Property} = require('../database/initializer');
const {deleteImage} = require('./imageHandler');

function loginMiddleware(req, res, next) {
  passport.authenticate('login', (error, user) => {
    try {
      if (error) {
        throw error;
      }

      req.login(user, {session: false}, (err) => {
        if (err) {
          throw err;
        }

        // Aqui ficam as informações a serem guardadas no cookie (jwt)
        const body = {
          id: user.id,
          email: user.email,
          role: user.role,
          image: user.image,
        };
        const token = jwt.sign({user: body}, process.env.SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRATION,
        });

        res.cookie('jwt', token, {
          // Opções do cookie:
          httpOnly: true,
          secure: process.env.NODE_ENV == 'production',
        });
        res.status(204).end();
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
}

function jwtMiddleware(req, res, next) {
  passport.authenticate('jwt', {session: false}, (error, user) => {
    try {
      if (error) next(error);
      console.log('user');
      console.log(user);
      if (!user) {
        throw new NotAuthorizedError('Você precisa estar logado!');
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  })(req, res, next);
}

function notLoggedIn(errorMessage) {
  return (req, res, next) => {
    try {
      const token = req.cookies['jwt'];
      if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
          if (!(err instanceof jwt.TokenExpiredError)) {
            throw new NotAuthorizedError(
              errorMessage || 'Você já está logado no sistema!',
            );
          }
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

function checkRole(roleArr) {
  return async (req, res, next) => {
    try {
      if (roleArr.indexOf(req.user.role) !== -1) {
        next();
      } else {
        if (req.files) {
          await delReqImages(req);
        }
        throw new NotAuthorizedError(
          'Você não tem permissão para realizar essa ação!',
        );
      }
    } catch (error) {
      next(error);
    }
  };
}

async function propertyBelongsToUser(req, res, next) {
  try {
    const userID = req.user.id;
    const propertyID = req.params.id;
    const property = await Property.findByPk(propertyID);
    if (!property) {
      throw new InvalidParamError('Não existe um imóvel com este ID');
    }
    const user = await property.getUser();
    if (user.id != userID) {
      if (req.files) {
        await delReqImages(req);
      }
      throw new NotAuthorizedError(
        'Você não tem permissão para acessar estes dados!',
      );
    }
    next();
  } catch (error) {
    next(error);
  }
}

async function delReqImages({files}) {
  for (const file of files) {
    await deleteImage(file.id);
  }
}

module.exports = {
  loginMiddleware,
  jwtMiddleware,
  checkRole,
  notLoggedIn,
  propertyBelongsToUser,
  delReqImages,
};
