import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';

export default function Allusers() {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/allusers', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log('Error on fetching all users:', error);
      });
  }, []);

  const deleteUser = (id) => {
    fetch(`http://localhost:5000/deleteuser/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        console.log('User deleted successfully.');
      })
      .catch((error) => {
        console.log('Error deleting user:', error);
      });
  };

  return (
    <>
        <Navbar />
        <div className='container mt-3'>
            <h5>All Users</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Created</th>
                        <th scope="col"></th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.designation}</td>
                        <td>{user.createdAt}</td>
                        <td><Link to={`/edituser/${user._id}`}>Edit user</Link></td>
                        <td><button onClick={() => deleteUser(user._id)} className='btn btn-danger btn-sm'>Delete</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>   
    </>
  )
}