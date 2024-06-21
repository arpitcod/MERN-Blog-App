import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'

const Blogdetails = () => {

    const [blog ,setBlog] = useState({});
    const id = useParams().id;
    const [inputs ,setInputs] = useState({})
    const navigate = useNavigate()



    const getSingleBlog = async () =>{
        try {
            await axios.get(`http://localhost:2914/api/blog/get-blog/${id}`)

            .then(response =>{
                if (response.data.success) {
                    setBlog(response.data.singleBlog)
                     setInputs({
                        title:response.data.singleBlog.title,
                        description:response.data.singleBlog.description,
                        image:response.data.singleBlog.image,
                     })
                    console.log(response.data)
                }
            }).catch(err =>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        getSingleBlog()
    },[id])
    console.log(blog)

    const handleChange = (e) =>{
        setInputs(prevState =>({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
    
        try {
             await axios.put(`http://localhost:2914/api/blog/update-blog/${id}`,{
                title:inputs.title,
                description:inputs.description,
                image:inputs.image,
                user:id
             })
             .then(response => {
                if (response?.data?.success) {
                    toast.success("Blog Updated")
                    navigate('/my-blogs')
                    console.log("create blog inputs",inputs)
    
                }
             }).catch(err =>{
                console.log(err)
                toast.error("error in create blog")
             })
        } catch (error) {
            console.log(error)
        }
    
    }
  return (
   <>
      <form onSubmit={handleSubmit}>
    <Box 
     boxShadow={"10px 10px 20px #ccc"}
     width={"60%"}
     border={3}
     borderRadius={10}
     display={'flex'}
     flexDirection={"column"}
     margin={"auto"}
     marginTop={"40px"}
     padding={3}
     

    >
    <Typography
    variant='h2'
    textAlign={"center"}
    fontWeight={"bold"}
    padding={3}
    color={"gray"}
    >
      Update A Post
    </Typography>

     <InputLabel
     sx={{mb:1,mt:2,fontSize:"24px",fontWeight:"bold"}}
     >
     Title
     </InputLabel>
     <TextField
     name='title'
     value={inputs.title}
     onChange={handleChange}
     >

     </TextField>

     <InputLabel
     sx={{mb:1,mt:2,fontSize:"24px",fontWeight:"bold"}}
     >
     Description
     </InputLabel>
     <TextField
     name='description'
     value={inputs.description}
     onChange={handleChange}
     >

     </TextField>

     <InputLabel
     sx={{mb:1,mt:2,fontSize:"24px",fontWeight:"bold"}}
     >
     Image Url
     </InputLabel>
     <TextField
     name='image'
     value={inputs.image}
     onChange={handleChange}
     >

     </TextField>
     <Button type='submit' color='warning' variant='contained'>Update</Button>
    </Box>

  </form>
  
   
   </>
  )
}

export default Blogdetails