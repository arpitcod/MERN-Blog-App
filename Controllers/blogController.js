const blogModel = require('../models/blogModel');
const mongoose = require('mongoose');
const userModel = require('../models/userModel');


//getAllBlogsController
exports.getAllBlogsController = async (rq,rs) =>{
    try {
        const blogs = await blogModel.find({}).populate('user')
        if (!blogs) {
            return rs.status(200).send({
                success:false,
                message:"no blog found"
            })
            
        }
        return rs.status(200).send({
            success:true,
            BlogLength:blogs.length,
            message:"all blogs list",
            blogs
        })
    } catch (error) {
        console.log(error)

        return rs.status(500).send({
            success:false,
            message:"error while getting blog"
        })
    }
}
//createBlogController
exports.createBlogController = async (rq,rs) =>{
    try {
        const {title,description,image ,user} = rq.body
    //   validation
    if (!title || !description || !image ||!user) {
        return rs.status(400).send({
            success:false,
            message:"please provide all field"
        })
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
        return rs.status(404).send({
            success:false,
            message:"enable to find user"
        })
    }
    const newBlog = new blogModel({title,description,image,user})
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({session});
    existingUser.blogs.push(newBlog);
    await existingUser.save({session});
    await session.commitTransaction();
    await newBlog.save();    
    
    

    return rs.status(201).send({
        success:true,
        message:" new blog created",
        newBlog
    })
    
    } catch (error) {
        console.log(error)
        return rs.status(500).send({
            success:false,
            message:"error while creaing blog",
            error
        })
    }
}
//updateBlogController
exports.updateBlogController = async (rq,rs) =>{
    try {

        const {id} = rq.params;
        const {title,description,image} =rq.body;

        const blogUpdate = await blogModel.findByIdAndUpdate(id,{...rq.body},{new:true})
        return rs.status(200).send({
            success:true,
            message:"Blog updated",
            blogUpdate
        })
        
    } catch (error) {
        console.log(error)

        return rs.status(400).send({
            success:false,
            message:"error while updating blog",
            error
        })
    }
}
//getSingleBlogController
exports.getSingleBlogController = async(rq,rs) =>{
    try {
        const {id} = rq.params;
        const singleBlog = await blogModel.findById(id);

        if (!singleBlog) {
            return rs.status(404).send({
                success:false,
                message:"blog not found with this id"
            })
        }

        return rs.status(200).send({
            success:true,
            message:"fetch single blog",
            singleBlog
        })
    } catch (error) {
        console.log(error)
        rs.status(400).send({
            success:false,
            message:"error while getting single blog",
            error
        })
    }
}
//deleteBlogController
exports.deleteBlogController = async (rq,rs) =>{
    try {
        const {id} = rq.params;

        const deleteBlog = await blogModel.findByIdAndDelete(id).populate("user")
        await deleteBlog.user.blogs.pull(deleteBlog);
        await deleteBlog.user.save();

        rs.status(200).send({
            success:true,
            message:"blog deleted",
            deleteBlog
        })
        
    } catch (error) {
        console.log(error)

        return rs.status(400).send({
            success:false,
            message:"error while getting delete blog",
            error

        })
    }
}


exports.userBlogController = async (rq,rs) =>{
    try {
        const userBlog = await userModel.findById(rq.params.id).populate("blogs")
        if (!userBlog) {
            return rs.status(404).send({
                success:false,
                message:"blog not found with this id"
            })
        }
        return rs.status(200).send({
            BlogsLength:userBlog.length,
            success:true,
            message:"user blogs",
            userBlog
        })
    } catch (error) {
        console.log(error)

        return rs.status(400).send({
            success:false,
            message:"error in user blog"
        })
    }
}

