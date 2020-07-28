const express = require('express');
const router = express.Router();

// we put all the request handler in to a new file , it s called controller
const blogController = require('../controller/blogController');

router.get('/', blogController.blog_index);

router.post('/', blogController.blog_create_post);

// il faut mettre avant get /:id : sinon node va prendre create comme id
router.get('/create', blogController.blog_create_get);

router.get('/:id', blogController.blog_details);

router.delete('/:id', blogController.blog_delete);

// router.use('/qqc', Route)

module.exports = router;
