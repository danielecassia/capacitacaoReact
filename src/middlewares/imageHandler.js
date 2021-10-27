const ImageKit = require('imagekit');
const MediaTypeError = require('../errors/MediaTypeError');
const multer = require('multer');
const path = require('path');

const imagekitSDK = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
});

const allowedExtensions = ['png', 'jpg', 'jpeg'];

function checkFileExtension(file, callback) {
  const extension = path.extname(file.originalname);
  const isValidExtension =
    allowedExtensions.indexOf(extension.substring(1).toLowerCase()) !== -1;

  const isValidMimeType =
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg';

  if (isValidExtension && isValidMimeType) {
    callback(null, true);
  } else {
    callback(
      new MediaTypeError(`A extensão ${extension} não é válida!`),
      false,
    );
  }
}

const saveImage = async (req, res, next) => {
  try {
    const images = req.files;
    if (images) {
      for (const img of images) {
        const ext = path.extname(img.originalname);
        const randomNumber = Math.round(Math.random() * 1000);
        const response = await imagekitSDK.upload({
          file: `data:image/${ext};base64,${img.buffer.toString('base64')}`,
          fileName: `${Date.now()}${randomNumber}.${ext}`,
        });
        img.id = response.fileId;
        img.filename = response.name;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

const deleteImage = async (fileID) => {
  try {
    await imagekitSDK.deleteFile(fileID);
  } catch (error) {
    next(error);
  }
};

const storage = multer.memoryStorage();
const upload = () => {
  return multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
      checkFileExtension(file, callback);
    },
  }).array('images');
};

module.exports = {upload, saveImage, deleteImage};
