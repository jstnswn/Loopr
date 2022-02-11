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

module.exports = router;
