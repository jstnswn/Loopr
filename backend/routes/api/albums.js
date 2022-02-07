const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();

const albumServices = require('./services/album-services');

router.get('/splash',
  asyncHandler(async (req, res) => {
    const albums = await albumServices.getSplashAlbums();
    res.status(200);
    res.json(albums);
  })
);


module.exports = router;
