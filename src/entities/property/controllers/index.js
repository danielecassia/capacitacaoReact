const router = require('express').Router();
const PropertyService = require('../services/PropertyService');
const {
  jwtMiddleware,
  checkRole,
  propertyBelongsToUser,
} = require('../../../middlewares/auth-middlewares');
const {upload, saveImage} = require('../../../middlewares/imageHandler');
const {requestFilter} = require('../../../middlewares/object-filter');
const {propertyValidate} = require('../../../middlewares/property-validator');
const NotAuthorizedError = require('../../../errors/NotAuthorizedError');

router.use(jwtMiddleware);

router.post(
  '/',
  upload(),
  saveImage,
  requestFilter('body', [
    'name',
    'address',
    'type',
    'price',
    'link',
    'sellerPhone',
  ]),
  propertyValidate('create'),
  async (req, res, next) => {
    try {
      const userID = req.user.id;
      const property = req.body;
      const images = req.files;
      const createdProperty = await PropertyService.create(
        userID,
        property,
        images,
      );
      res.status(201).json({id: createdProperty.id});
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/add-images/:id',
  upload(),
  saveImage,
  propertyBelongsToUser,
  async (req, res, next) => {
    try {
      const ID = req.params.id;
      const images = req.files;
      await PropertyService.addImages(ID, images);
      res.status(200).end();
    } catch (error) {
      next(error);
    }
  },
);

router.get('/:id', propertyBelongsToUser, async (req, res, next) => {
  try {
    const ID = req.params.id;
    const property = await PropertyService.getByID(ID);
    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
});

router.patch(
  '/update-data/:id',
  upload(),
  saveImage,
  requestFilter('body', [
    'name',
    'address',
    'type',
    'price',
    'link',
    'sellerPhone',
  ]),
  propertyValidate('update'),
  propertyBelongsToUser,
  async (req, res, next) => {
    try {
      const ID = req.params.id;
      const body = req.body;
      await PropertyService.update(ID, body);
      res.status(204).end();
    } catch (error) {
      next(erro);
    }
  },
);

router.patch(
  '/remove-images/:id',
  requestFilter('body', ['images']),
  propertyBelongsToUser,
  async (req, res, next) => {
    try {
      const propertyID = req.params.id;
      const property = await PropertyService.getByID(propertyID);
      const images = req.body.images;
      const unauthorized = [];
      for (const imageID of images) {
        if (!property.Images.some((i) => i.id === imageID)) {
          unauthorized.push(imageID);
        } else {
          await PropertyService.removeImage(imageID);
        }
      }
      if (unauthorized.length > 0) {
        throw new NotAuthorizedError(
          `A imagem ${unauthorized[0]} não pertence a esta propriedade.`,
        );
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id', propertyBelongsToUser, async (req, res, next) => {
  try {
    const ID = req.params.id;
    await PropertyService.delete(ID);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.get('/admin/all', checkRole(['Admin']), async (req, res, next) => {
  try {
    const props = await PropertyService.getAll();
    res.status(200).json(props);
  } catch (error) {
    next(error);
  }
});

router.delete('/admin/:id', checkRole(['Admin']), async (req, res, next) => {
  const ID = req.params.id;
  await PropertyService.delete(ID);
  res.status(204).end();
});

module.exports = router;
