import { Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Createblog = () => {

    const id = localStorage.getItem("userId")
    const navigate = useNavigate()

    const [inputs ,setInputs] = useState({
        title:"",
        description:"",
        image:"",
        
    })

const handleChange = (e) =>{
    setInputs(prevState =>({
        ...prevState,
        [e.target.name] : e.target.value
    }))
}

const handleSubmit = async (e) =>{
    e.preventDefault()

    try {
         await axios.post('http://localhost:2914/api/blog/create-blog',{
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
            user:id
         })
         .then(response => {
            if (response.data.success) {
                toast.success("New Blog Created")
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
      Create A Post
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
     <Button type='submit' color='primary' variant='contained'>Submit</Button>
    </Box>

  </form>
  
</>
  )
}

export default Createblog