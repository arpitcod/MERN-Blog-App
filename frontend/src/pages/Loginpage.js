import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Loginpage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs,setInputs] = useState({
    email:"",
    password:"",
  })

  const handleChange = (e) =>{

    setInputs((prevState)=>({
            ...prevState,
      [e.target.name] : e.target.value,

    })
  )}

  const handleSubmit = async (e) =>{
    e.preventDefault()
    // console.log(inputs)

    
    try {
      
      await axios.post('http://localhost:2914/api/user/login',{

        email:inputs.email,
        password:inputs.password
      })

      .then(response =>{
            if (response.data) {
              localStorage.setItem('userId',response?.data?.user?._id)
              dispatch(authActions.login())
              // console.log(response?.data?.user?._id)
              console.log(response.data)
              navigate('/')
              toast.success('Login Successfully')
            }
      }).catch((err) =>{
        console.log(err)
        toast.error('error in Login')
      })
      
    } catch (error) {
      console.log(error)
    }

  }
  return (
 <>
 
 <form onSubmit={handleSubmit}>

    
<Box
 maxWidth={450}
 display='flex'
 flexDirection={'column'}
 alignItems={'center'}
 justifyContent={'center'}
 margin={'auto'}
 marginTop={5}
 boxShadow={"10px 10px 20px  #ccc"}
 padding={3}
 borderRadius={5}
>
  <Typography 
  variant="h4" 
  sx={{ textTransform: "uppercase" }}
  padding={3}
  textAlign='center'
  >
    Login
  </Typography>
{/* ////////////////////////////////////////////////////////////////////////////// */}
 
  <TextField 
  placeholder="emai"
  type="email"
  required
  margin="normal"
  name="email"
  value={inputs.email}
  onChange={handleChange}
  />
  <TextField 
  placeholder="password"
  type="password"
  required
  margin="normal"
  name="password"
  value={inputs.passowrd}
  onChange={handleChange}
  />
  <Button 
  type="submit"
  sx={{borderRadius:1, marginTop:3}}
  variant="contained"
  color="primary"
  >Submit</Button>

  <Button 
  type="submit"
  sx={{borderRadius:3, marginTop:3}}
  // variant="contained"
  color="primary"
  onClick={()=>navigate('/register')}
  >Not user ? Please Register</Button>
</Box>
</form>
 </>
  )
}

export default Loginpage