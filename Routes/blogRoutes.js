const express = require('express');
const { getAllBlogsController, createBlogController, updateBlogController, getSingleBlogController, deleteBlogController, userBlogController } = require('../Controllers/blogController');

const router = express.Router();

//get all blogs http://localhost:2914/api/blog/get-all-blogs
router.get('/get-all-blogs',getAllBlogsController),

//create blog with post  http://localhost:2914/api/blog/create-blog
router.post('/create-blog',createBlogController),

//update blog using PUT http://localhost:2914/api/blog/update-blog/66352768b177fbd011dbf3ad
router.put('/update-blog/:id',updateBlogController),

//get single blog using Get http://localhost:2914/api/blog/get-blog/6635277fb177fbd011dbf3af
router.get('/get-blog/:id',getSingleBlogController),

//delete blog using DELETE http://localhost:2914/api/blog/delete-blog/663535d65a54021571f3d73b
router.delete('/delete-blog/:id',deleteBlogController)

//get user blog  http://localhost:2914/api/blog/user-blog/6635447b68f2f6c6f7bb82b7
router.get('/user-blog/:id',userBlogController)

module.exports = router;