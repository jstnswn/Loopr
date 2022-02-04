const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

// try -multer- middleware

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/hey', upload.single('image'), (req, res) => {
  console.log('hey 🙌', req.file);
})

module.exports = router;
