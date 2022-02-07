const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

const imageServices = require('./services/images-services');

const validateImage = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage('Title must be between 1 and 30 characters'),
  check('description')
    .isLength({ max: 300 })
    .withMessage('Description must be less than 300 characters'),
  check('imageUrl')
    .exists({ checkFalsy: true })
    .withMessage('Image upload requires an image')
];


router.get('/splash',
  asyncHandler(async (req, res) => {
    const images = await imageServices.getSplashImages();

    res.status(200);
    res.json(images);
  })
);

router.post('/users/current',
  validateImage,
  restoreUser,
  singleMulterUpload('image'),
  asyncHandler(
    async (req, res) => {
      const { user } = req;
      const { title, description, albumId } = req.body;
      const imageUrl = await singlePublicFileUpload(req.file);

      const image = await imageServices
        .createImage(user.id, title, description, albumId, imageUrl);

      if (image) {
        res.status(201);
        res.json({ image });
      }
    })
);


module.exports = router;
