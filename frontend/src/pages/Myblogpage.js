import axios from 'axios';

import React, { useEffect, useState } from 'react'
import Blogcard from '../components/Blogcard';
//user blogs
const Myblogpage = () => {

  const id = localStorage.getItem('userId')
  const [blogs,setBlogs] = useState([]);

  const getUserBlogs = async () =>{
    try {
       
      await axios.get(`http://localhost:2914/api/blog/user-blog/${id}`)
        
      .then((response) =>{
        if (response?.data) {
          setBlogs(response?.data?.userBlog?.blogs)
          // console.log('user blog',response?.data?.userBlog)
          console.log('user blog',response?.data?.userBlog?.blogs)
          
        }
      }).catch((err) =>{
        console.log(err)
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getUserBlogs()
  },[])
  return (
  
 <>
 
 {blogs && blogs.length > 0 ? (blogs.map((blog) =>(

       <Blogcard
         id={blog?._id}
         isUser={true}
         title={blog?.title}
         description={blog?.description}
         image={blog?.image}
         username={blog?.user?.username}
         time={blog?.createdAt}
       />
       ))) : (<h1 align="center">you dont have blog</h1>) 
     }
 
 </>
  
  )
}

export default Myblogpage