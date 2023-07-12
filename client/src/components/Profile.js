import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import Cookies from 'universal-cookie';

export default function Profile() {
    const cookies = new Cookies();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [created, setCreated] = useState('');
    const [designation, setDesignation] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
          try {
            const response = await fetch('http://localhost:5000/profile', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.get('jwt')}`,
              },
            });
    
            const data = await response.json();
            // console.log('what i want', data)
            setUsername(data.user.username);
            setEmail(data.user.email);
            setCreated(data.user.createdAt);
            setDesignation(data.user.designation);

          } catch (error) {
            console.log('Error on fetching user profile', error);
          }
        };
    
        fetchProfile();
      }, []);

  return (
    <>
    <Navbar />
        <div className='container mt-3'>
            <h5>Profile</h5>
            <div className='row'>
                <div className='col-md-4'>
                <div class="card">
                    <img src="" class="card-img-top" alt="..." />
                    <div class="card-body">
                        <h5 class="card-title">Name: {username}</h5>
                        <p class="card-text">Email: {email}</p>
                        <p class="card-text">Designation: {designation}</p>
                        <p class="card-text">Created: {created}</p>
                    </div>
                    </div>
                </div>
                <div className='col-md-8'>
                    <form className='form-group'>

                    </form>
                </div>
            </div>
        </div>
    </>
  )
}