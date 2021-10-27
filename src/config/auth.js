const InvalidParamError = require('../errors/InvalidParamError');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const {User} = require('../database/initializer');
const bcrypt = require('bcrypt');
const blacklist = require('../redis/blacklist');
const {JsonWebTokenError} = require('jsonwebtoken');

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({where: {email: email}});
        if (!user) {
          throw new InvalidParamError('Email não cadastrado');
        }

        const matchingPassword = await bcrypt.compare(password, user.password);
        if (!matchingPassword) {
          throw new InvalidParamError('Senha incorreta');
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  return token;
};

passport.use(
  new JWTStrategy(
    {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: cookieExtractor,
      passReqToCallback: true,
    },
    async (req, jwtPayload, done) => {
      try {
        const blacklistHasToken = await blacklist.hasToken(req.cookies['jwt']);
        if (blacklistHasToken) {
          throw new JsonWebTokenError('Token inválido por logout!');
        }
        return done(null, jwtPayload.user);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
