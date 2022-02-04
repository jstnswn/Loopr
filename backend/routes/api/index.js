const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);

router.post('/hey', (req, res) => {
  console.log('heyyyyyy!!!!!!', req.body);
})

module.exports = router;
