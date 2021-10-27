const router = require('express').Router();
const UserService = require('../services/UserService');
const {
  loginMiddleware,
  jwtMiddleware,
  checkRole,
  notLoggedIn,
} = require('../../../middlewares/auth-middlewares');
const {userValidate} = require('../../../middlewares/user-validator');
const {requestFilter} = require('../../../middlewares/object-filter');
const blacklist = require('../../../redis/blacklist');
const passwordToken = require('../../../redis/password-token');
const SendMailService = require('../services/SendMailService');
const path = require('path');

router.post(
  '/login',
  notLoggedIn(),
  userValidate('login'),
  loginMiddleware,
);

router.post(
  '/',
  requestFilter('body', ['email', 'password', 'passwordConfirmation', 'name']),
  notLoggedIn(),
  userValidate('register'),
  async (req, res, next) => {
    try {
      const user = req.body;
      user.role = 'User';
      const createdUser = await UserService.create(user);
      res.status(201).json({id: createdUser.id});
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/forgot-password',
  notLoggedIn(
    'Você não pode usar a funcionalidade de Esqueci Minha Senha ' +
      'estando logado!',
  ),
  userValidate('forgotPassword'),
  async (req, res, next) => {
    try {
      const user = await UserService.getUserByEmail(req.body.email);
      if (user) {
        const mailInfo = {
          receiver: user.email,
          sender: '"Sistema ijunior 👻" <ijunior@ijunior.com.br>',
          subject: 'Redefinição de Senha',
        };

        mailInfo.path = await path.resolve(
          __dirname,
          '..',
          'views',
          'email.html',
        );

        const token = await passwordToken.generateToken(user.email);

        const viewVariables = {
          HOST_URL: process.env.HOST_URL,
          token,
        };
        // Possivelmente desativar isso
        await SendMailService.send(mailInfo, viewVariables);
        res.status(200).json({token});
      }
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/reset-password/:token',
  notLoggedIn(
    'Você não pode usar a funcionalidade de Esqueci Minha Senha ' +
      'estando logado!',
  ),
  requestFilter('body', ['password', 'passwordConfirmation']),
  userValidate('resetPassword'),
  async (req, res, next) => {
    try {
      const token = req.params.token;
      const password = req.body.password;
      await UserService.resetPassword(token, password);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

router.get('/logout', jwtMiddleware, async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    await blacklist.addToken(token);

    req.logout();
    res.clearCookie('jwt');
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.get('/user/:id', jwtMiddleware, async (req, res, next) => {
  try {
    const ID = req.params.id;
    const user = await UserService.get(ID);
    user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/properties/', jwtMiddleware, async (req, res, next) => {
  try {
    const userID = req.user.id;
    const userProperties = await UserService.getProperties(userID);
    res.status(200).json(userProperties);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/change-password',
  jwtMiddleware,
  requestFilter('body', [
    'email',
    'oldPassword',
    'newPassword',
    'newPasswordConfirmation',
  ]),
  userValidate('changePassword'),
  async (req, res, next) => {
    try {
      const ID = req.user.id;
      const newPassword = req.body.newPassword;
      await UserService.updatePassword(ID, newPassword);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/',
  jwtMiddleware,
  requestFilter('body', ['email', 'name']),
  userValidate('update'),
  async (req, res, next) => {
    try {
      // terminar de implementar upload de foto
      const ID = req.user.id;
      const body = req.body;
      await UserService.alter(ID, body);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/', jwtMiddleware, async (req, res, next) => {
  try {
    const ID = req.user.id;
    await UserService.delete(ID);
    res.status(200).json('Seu usuário foi deletado com sucesso!');
  } catch (error) {
    next(error);
  }
});

router.get(
  '/admin/all',
  jwtMiddleware,
  checkRole(['Admin']),
  async (req, res, next) => {
    try {
      const users = await UserService.getAll();
      users.forEach((user) => {
        user.password = undefined;
      });
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/admin/create',
  jwtMiddleware,
  checkRole(['Admin']),
  requestFilter('body', ['email', 'password', 'passwordConfirmation', 'name']),
  userValidate('register'),
  async (req, res, next) => {
    try {
      const user = req.body;
      user.role = 'Admin';
      const createdUser = await UserService.create(user);
      res.status(201).json({id: createdUser.id});
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  '/admin/:id',
  jwtMiddleware,
  checkRole(['Admin']),
  async (req, res, next) => {
    try {
      const ID = req.params.id;
      await UserService.delete(ID);
      res.status(200).json('Usuário deletado com sucesso!');
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
