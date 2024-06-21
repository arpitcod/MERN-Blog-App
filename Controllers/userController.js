const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');

//get all users

exports.getAllUsers = async (rq,rs) =>{

     try {
         const users = await userModel.find({})
         // const jsonUser = JSON.stringify(getAll)
     
         return rs.status(200).send({
             userCount:users.length,
             success:true,
             message:"all users data",
             users
         })
        
     } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            message:"error in get users "
        })
     }
        
     }

// user register
exports.registerController = async (rq,rs) =>{
    try {
        const {username,email,password} = rq.body;
        if (!username) {
            return rs.status(400).send({
               success:false,
               message:"please enter username" 
            })
            
            
        }
        if (!email) {
            return rs.status(400).send({
                success:false,
                message:"please enter email"
            })
        }
        if (!password) {
            return rs.status(400).send({
                success:false,
                message:"please enter password"
            })
            
        }

        //existing user
        const existingUser = await userModel.findOne({email})
        if (existingUser) {
            return rs.status(401).send({
                success:false,
                message:"user already exist"
            })
        }
        
        //hashed password bcrypt

        const hashedPassword = await bcrypt.hash(password,10)
        // password=hashedPassword;

        // svae new user
        const user = new userModel({username,email,password:hashedPassword})
        await user.save();

        return rs.status(201).send({
            success:true,
            message:"new user is created",
            user
        })
    } catch (error) {
        console.log(error)
        rs.status(500).send({
            success:false,
            message:"error in register controller"
        })
    }
}

///user login
exports.loginCOntroller = async (rq,rs) =>{
    try {
        const {email,password} = rq.body;

        if (!email || !password) {
            rs.status(401).send({
                success:false,
                message:"please provide email or password"
            })
        }
        
        const user = await userModel.findOne({email});
        if (!user) {
            return rs.status(401).send({
                success:false,
                message:"email is not register"
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
              return rs.status(401).send({
                success:false,
                message:"invalid email or password"
              })
        }

        return rs.status(200).send({
            success:true,
            message:"login successfuly",
            user
        })
         
    } catch (error) {
        console.log(error)

        return rs.status(500).send({
            success:false,
            message:"error in login controller",
            error
        })
    }
}