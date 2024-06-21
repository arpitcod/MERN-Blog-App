import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Blogcard from '../components/Blogcard'

const Blogpage =  () => {
  const [blogs,setBlogs] = useState([])
    

  const getAllBlogs = async () =>{

    try {
    await axios.get('http://localhost:2914/api/blog/get-all-blogs')
    .then(response =>{
      if (response?.data?.blogs) {
        setBlogs(response?.data?.blogs)
        console.log('your data',response.data.blogs)

      }

     
    
    }).catch((err) =>{
    
      console.log(err)
    })
    
    
  } catch (error) {
    console.log(error)
    toast.error("error in blog ")
  }
}

  useEffect(()=>{
    getAllBlogs();
  },[])
  return (
   <>

   {blogs && blogs.map(blog =>(

    <Blogcard
      id={blog?._id}
      isUser={localStorage.getItem('userId') === blog?.user?._id}
      title={blog?.title}
      description={blog?.description}
      image={blog?.image}
      username={blog?.user?.username}
      time={blog?.createdAt}
    />
   ))}
   </>
    
  )
}

export default Blogpage