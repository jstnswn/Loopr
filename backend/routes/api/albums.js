const express = require('express')
const asyncHandler = require('express-async-handler');

const router = express.Router();

const albumServices = require('./services/algum-services');

router.get('/splash',
  asyncHandler(async (req, res) => {
    console.log('!!!!!!!!!!')
    const albums = await albumServices.getSplashAlbums();
    console.log('??????????')
    res.status(200);
    res.json(albums);
  })
);


module.exports = router;
