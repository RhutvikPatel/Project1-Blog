const express=require('express');
const router=express.Router();
const authorController=require('../controller/authorController')
const blogController=require('../controller/blogController')

router.post('/authors', authorController.authors)
router.post('/blogs', blogController.createBlog)


module.exports = router 