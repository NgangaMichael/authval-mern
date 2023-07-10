import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from './useFetch';
import Navbar from './Navbar';

export default function Editblog() {
  const navigate = useNavigate();
  const {id} = useParams();
  const {blogs, pending, error} = useFetch(`http://localhost:5000/editblog/${id}`)

  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [author, setAuthor] = useState('')
  const [body, setBody] = useState('')
  const [file, setFile] = useState(null);

  useEffect(() => {
    if(blogs) {
      setTitle(blogs.title)
      setSubtitle(blogs.subtitle)
      setAuthor(blogs.author)
      setBody(blogs.body)
    }
  }, [blogs])

  const formdata = (e) => {
    e.preventDefault();
    const editedblog = {title, subtitle, author, body};
    fetch(`http://localhost:5000/updateblog/${id}`, {
      method: "PUT",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(editedblog)
    })
    .then(navigate(`/details/${id}`))
  }

  return (    
    <>
    <Navbar />
    <div className='container mt-3'>
      {pending && <div>Loading...</div>}
      {blogs && (

        <form className='form-group' onSubmit={formdata}>
          <label>Title</label>
          <input 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='form-control' type='text'/>

          <label>Subtitle</label>
          <input 
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          className='form-control' type='text' />

          <label>Author</label>
          <input 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='form-control' type='text' />

          <label>Body</label>
          <textarea 
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className='form-control'>{body}</textarea>

          <button className='btn btn-warning btn-sm mt-2'>Update</button>
        </form>
      )}
      {error && <div>{error}</div>}
    </div>
    </>
    
  )
}
