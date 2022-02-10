const express = require('express')
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { restoreUser } = require('../../utils/auth');

const router = express.Router();

const albumServices = require('./services/album-services');

const validateAlbum = [
  check('title')
    .exists({ checkFalsy: true })
    .isLength({ min: 1, max: 30 })
    .withMessage('Title must be between 1 and 30 characters'),
  check('description')
    .isLength({ max: 300 })
    .withMessage('Description must be less than 300 characters')
];

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
  validateAlbum,
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

router.delete('/:albumId(\\d+)',
  asyncHandler(async (req, res) => {
    const { albumId } = req.params;

    const deleted = await albumServices.deleteAlbum(albumId);

    if (deleted) {
      res.status(204).end();
    }
  })
);


module.exports = router;
