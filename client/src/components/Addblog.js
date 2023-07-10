import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

export default function Addblog() {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate('/');


    const handleImageChange = (e) => {
        const selectedfile = e.target.files[0]
        setFile(selectedfile);
    }

    // submiting with image 
    const submitFrom = (e) => {
        e.preventDefault();
        const formdata = new FormData();

        formdata.append('title', title);
        formdata.append('subtitle', subtitle);
        formdata.append('author', author);
        formdata.append('body', body);
        formdata.append('image', file);

        fetch('http://localhost:5000/addblog', {
            method: "POST",
            body: formdata,
        })
        .then(navigate('/allblogs'))

    }


    // submiting without image 
    // const submitFrom = (e) => {
    //     e.preventDefault();
    //     const newblog = {title, subtitle, author, body};

    //     fetch('http://localhost:5000/addblog', {
    //         method: "POST",
    //         headers: {"Content-type": "application/json"},
    //         body: JSON.stringify(newblog)
    //     })
    //     .then(navigate('/'))
    //     .catch(err => console.log('Err on post', err))
    // }

  return (
    <>
        <Navbar />
        <div className='container mt-3'>
        <h5>Add Blog</h5>
        <hr />
        <form className='form-group' onSubmit={submitFrom}>
            <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='form-control mt-2' placeholder='Title' type='text' name='title' />
            <input 
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className='form-control mt-2' placeholder='Subtitle' type='text' name='subtitle' />
            <input 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='form-control mt-2' placeholder='Author' type='text' name='author' />
            <textarea 
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className='form-control mt-2' placeholder='Body' name='body'></textarea>
            <input 
            onChange={handleImageChange}
            className='form-control mt-2' type='file' />

            <button className='btn btn-success btn-sm mt-2'>Save</button>
        </form>
    </div>
    </>
  )
}