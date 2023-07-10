import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Loginpage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrormessage] = useState('');
  const navigate = useNavigate();
  const cookies = new Cookies(); // Create an instance of the Cookies class

  const submitform = async (e) => {
    try {
      e.preventDefault();
      const userdetails = { email, password };
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(userdetails),
      });

      const data = await response.json();
      if (data.success) {
        // Set the cookie on successful login
        cookies.set('jwt', data.token, { path: '/' });
        cookies.set('designation', data.designation, { path: '/' }); // Save the designation in the cookie
        
        navigate('/allblogs', { state: { username: data.username, email: data.email } });
      } else if (data.message === 'Invalid') {
        setErrormessage('Incorrect user credentials');
      } else {
        setErrormessage('User not found');
      }
    } catch (error) {
      console.log('Error on login page', error);
    }
  };

  return (
    <div className="container mt-5 p-4" style={{ boxShadow: '0px 0px 5px', borderRadius: '1rem' }}>
      <h6 className="text-center">AllBAPP</h6>
      <p>Login</p>
      {errorMessage && <div className="alert alert-warning" role="alert">{errorMessage}</div>}
      <form className="form-group" onSubmit={submitform}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mt-2"
          type="text"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mt-2"
          type="password"
        />
        <button className="btn btn-success btn-sm mt-2">Submit</button>
      </form>
    </div>
  );
}
