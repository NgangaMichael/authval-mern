import React from 'react'
import { useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function Bloglist({blogs}) {
    const location = useLocation();
    const { username, email } = location.state || {}; // Get the username and email from the location state

  return (
    <div className='container mt-3'>
        {username && (
          <div className="welcome-message">
            <h5>Welcome, {username}!</h5>
            <p>Email: {email}</p>
          </div>
        )}
        <div className='row'>
            {blogs.length > 0 ? blogs.map((blog) => (
                <div className='col-md-4 mt-2' key={blog._id}>
                    <div class="card">
                        <img src={`http://localhost:5000/blogimages/${blog.image}`} class="card-img-top img-fluid" alt="..." />
                        <div class="card-body">
                        <h5 class="card-title">{blog.title}</h5>
                        <p class="card-text">{blog.subtitle}</p>
                        <Link to={`/details/${blog._id}`}>Read More</Link>
                        </div>
                    </div>
                </div>
                )) : 

                <div>
                    <h5>ZERO BLOGS FOUND ADD A BLOG</h5>
                </div>
            }
        </div>
    </div>
  )
}