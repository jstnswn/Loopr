const express = require('express')
const asyncHandler = require('express-async-handler');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

const imageServices = require('./services/images-services');


router.get('/splash',
  asyncHandler(async (req, res) => {
    const images = await imageServices.getSplashImages();

    res.status(200);
    res.json(images);
  })
);

router.post('/users/current',
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
