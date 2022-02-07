const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imagesRouter = require('./images.js');
const albumsRouter = require('./albums.js');

const multer = require('multer');
// const upload = multer({ dest: 'uploads/' })

const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3');

// try -multer- middleware

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/images', imagesRouter);
router.use('/albums', albumsRouter);

router.post('/photo-upload-test', singleMulterUpload('image'), async (req, res) => {
  const url = await singlePublicFileUpload(req.file);
  console.log('URL: ', url);
})

module.exports = router;
