const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { singleMulterUpload, singlePublicFileUpload, multipleMulterUpload, multiplePublicFileUpload } = require('../../awsS3');
const { restoreUser } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const imageServices = require('./services/images-services');

const validateImage = [
  // check('title')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 1, max: 30 })
  //   .withMessage('Title must be between 1 and 30 characters'),
  check('description')
    .isLength({ max: 300 })
    .withMessage('Description must be less than 300 characters'),
  // check('imageUrl')
  //   .exists({ checkFalsy: true })
  //   .withMessage('Image upload requires an image'),
    handleValidationErrors
];


router.get('/splash',
  asyncHandler(async (req, res) => {
    const images = await imageServices
      .getSplashImages();

    res.status(200);
    res.json(images);
  })
);

router.get('/users/current',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;

    const images = await imageServices
      .getImagesByUserId(user.id);

    if (images) {
      res.status(200);
      res.json(images);
    }
  })
);

router.get('/public',
  asyncHandler(async (req, res) => {
    const images = await imageServices
      .getAllPublicImages();

    if (images) {
      res.status(200);
      res.json(images);
    }
  })
);

router.post('/users/current/single-upload',
  restoreUser,
// validateImage,
  singleMulterUpload('image'),
  asyncHandler(async (req, res) => {
      const { user } = req;
      const { title, description, albumId } = req.body;
      const imageUrl = await singlePublicFileUpload(req.file);

      const image = await imageServices
        .createImage(user.id, title, description, albumId, imageUrl);

      if (image) {
        res.status(200);
        res.json({ image });
      }
    })
);

router.post('/users/current/multi-upload',
  restoreUser,
  multipleMulterUpload('images'),
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { albumId } = req.body;
    const imageUrls = await multiplePublicFileUpload(req.files);

    const images = await imageServices
      .createImages(imageUrls, albumId, user.id)

    if (images) {

      res.status(200);
      res.json({ images })
    }
  })
);

router.delete('/:imageId(\\d+)',
  asyncHandler(async (req, res) => {
    const { imageId } = req.params;

    const deleted = await imageServices
      .deleteImage(imageId);

    if (deleted) {
      res.status(204).end();
    }
  })
);

router.delete('/multi-delete',
  asyncHandler(async (req, res) => {
    const { imageIds } = req.body;

    await imageServices
      .deleteImages(imageIds)
    // Currently no return from deleteImages

    res.status(204).end();
  })
);

router.patch('/:imageId(\\d+)',
  validateImage,
  asyncHandler(async (req, res) => {
    const { imageId } = req.params;
    const { title, description, albumId } = req.body;
    const updates = { title, description, albumId };

    const image = await imageServices
      .patchImage(imageId, updates);

    if (image) {
      res.status(201);
      res.json({image});
    }
  })
);

module.exports = router;
