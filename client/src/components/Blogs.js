import React from 'react'
import useFetch from './useFetch';
import Bloglist from './Bloglist';
import Navbar from './Navbar';

export default function Blogs() {
    const {blogs, pending, error} = useFetch('http://localhost:5000/allblogs')
    console.log(blogs)
  return (
    <>
    <Navbar />
    <div className='container mt-3'>
        {pending && <div>Loading...</div>}
        {blogs && <Bloglist blogs={blogs} />}
        {error && <div>{error}</div> }
    </div>
    </>
    
  )
}