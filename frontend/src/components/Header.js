import React, { useState } from 'react'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from'@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../redux/store'
import { toast } from 'react-toastify'

const Header = () => {
//global state
let isLogin = useSelector((state) => state.isLogin)
isLogin = isLogin || localStorage.getItem('userId')
// const isLogin = useSelector((state) => state.isLogin)
console.log(isLogin)

    const [value,setValue] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //logout
    const handleLogout = () =>{
      try {
        localStorage.removeItem('userId')
        dispatch(authActions.logout())
        toast.success("Logout Successfully")
        navigate('/login')
        
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
      <AppBar position='sticky'>
          <Toolbar>
            <Typography variant='h4' LinkComponent={Link} to='/'>Blog-App</Typography>
            {isLogin && (
                 <Box display={'flex'} marginLeft={'auto'}>
                     <Tabs textColor='inherit' value={value} onChange={(e,val)=>setValue(val)}>
                        <Tab label='blogs' LinkComponent={Link} to='/'></Tab>
                        <Tab label='my-blogs' LinkComponent={Link} to='/my-blogs'></Tab>
                        <Tab label='Create-Blog' LinkComponent={Link} to='/create-blog'></Tab>
                     </Tabs>

                 </Box>

            )}

                <Box display={'flex'} marginLeft={'auto'}>
            {!isLogin && (
              <>
              
                    <Button sx={{margin:1,color:"white"}} LinkComponent={Link} to='/login'>Login</Button>
                    <Button sx={{margin:1,color:"white"}} LinkComponent={Link} to='/register'>Register</Button>
              </>
                  )}
            {isLogin && (
              <Button sx={{margin:1,color:"white"}} onClick={handleLogout}>Logout</Button>
              
            )}
            </Box>    
          </Toolbar>
      </AppBar>
    </>
  )
}

export default Header