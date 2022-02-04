const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

// try -multer- middleware

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/hey', (req, res) => {
  console.log('hey 🙌', req.body);
})

module.exports = router;
