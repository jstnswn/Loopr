const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();

const imageServices = require('./services/images-services');


router.get('/splash',
  asyncHandler(async (req, res) => {
    const images = await imageServices.getSplashImages();

    res.status(200);
    res.json(images);
  })
);

module.exports = router;
