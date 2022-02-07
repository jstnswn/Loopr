const express = require('express')
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

const albumServices = require('./services/album-services');

router.get('/splash',
  asyncHandler(async (req, res) => {
    const albums = await albumServices.getSplashAlbums();
    res.status(200);
    res.json(albums);
  })
);

router.get('/users/current',
  restoreUser,
  asyncHandler(
  async (req, res) => {
    const { user } = req;

    const albums = await albumServices.getAlbumsByUserId(user.id);
    if (albums) {
      res.status(200);
      res.json(albums)
    }
  })
);

router.post('/users/current',
  restoreUser,
  asyncHandler(
    async (req, res) => {
      const { user } = req;
      const { title, description } = req.body;

      const album = await albumServices.createAlbum(user.id, title, description);

      if (album) {
        res.status(201);
        res.json({album});
      }
    })
);


module.exports = router;
