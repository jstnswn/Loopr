const express = require('express')
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');

const favoritesServices = require('./services/favorites-services');

const router = express.Router();

router.get('/images/users/current',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;

    const favoriteImages = await favoritesServices
      .getFavImagesByUserId(user.id);

    if (favoriteImages) {
      res.status(200);
      res.json(favoriteImages);
    }
  })
);

router.post('/images/users/current',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { imageId } = req.body;

    const favorite = await favoritesServices
      .favoriteImage(imageId, user.id);

    res.status(200).end();
  })
);

router.delete('/images/:imageId(\\d+)/users/current',
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    const { imageId } = req.params;

    const deleted = await favoritesServices
      .unfavoriteImage(imageId, user.id);

    if (deleted) {
      res.status(204).end();
    }
  })
);

module.exports = router;
