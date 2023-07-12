import React, { useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';

export default function Adduser() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [designation, setDesignation] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitform = (e) => {
        e.preventDefault();
        try {
            const user = {email, username, designation, password}
            fetch('http://localhost:5000/adduser/', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(user)
            })
            .then(navigate('/allusers'))            
        } catch (error) {
            console.log('Err on add user', error)
        }
    }
  return (
    <>
        <Navbar />
        <div className='container mt-3'>
            <h5>Add User</h5>
            <form className='form-group' onSubmit={submitform}>
                <input className='form-control mt-2'
                type='text'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input className='form-control mt-2'
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <input className='form-control mt-2'
                type='text'
                placeholder='Designation'
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                />

                <input className='form-control mt-2'
                type='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button className='btn btn-success btn-sm mt-2'>Save user</button>
            </form>
        </div>
    </>
  )
}