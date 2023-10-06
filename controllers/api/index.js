const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');


//http://localhost:3001/api/users
router.use('/users', userRoutes);

//http://localhost:3001/api/posts
router.use('/posts', postRoutes);

module.exports = router;
