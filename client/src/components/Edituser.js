import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate, useParams } from 'react-router-dom';

export default function Edituser() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [designation, setDesignation] = useState('');
    const [password, setPassword] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/edituser/${id}`, {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setUsername(data.username);
            setEmail(data.email);
            setDesignation(data.designation);
        })
        .catch(err => {
            console.log('Err on edit route', err)
        })
    }, [])

    const submitform = (e) => {
        e.preventDefault();
        const userupdate = {username, email, designation, password}
        fetch(`http://localhost:5000/updateuser/${id}`, {
            method: 'PUT',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify(userupdate)
        })
        .then(navigate('/allusers'))
        .catch(err => console.log(err))
    }
  return (
    <>
        <Navbar />
        <div className='container mt-3'>
            <h5>Edit user details</h5>
            <form className='form-control' onSubmit={submitform}>
                <label>Username</label>
                <input className='form-control mt-2' 
                type='text' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} />
                <label>Email</label>
                <input className='form-control mt-2' 
                type='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />
                <label>Designation</label>
                <input className='form-control mt-2' 
                type='text' 
                value={designation} 
                onChange={(e) => setDesignation(e.target.value)} />
                <label>Password</label>
                <input className='form-control mt-2' 
                type='password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />

                <button className='btn btn-warning btn-sm mt-2'>Update details</button>
            </form>
        </div>
    </>
  )
}