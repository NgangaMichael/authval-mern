import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';

export default function Navbar() {
  const navigate = useNavigate();
  const [designation, setDesignation] = useState(''); // State to store the user's designation
  const cookies = new Cookies();

  useEffect(() => {
    const userDesignation = cookies.get('designation');
    setDesignation(userDesignation); // Retrieve the user's designation from the cookie
  }, []);

  // navigating using usenavigate 
  // const handleLogout = () => {
  //   const cookies = new Cookies();
  //   cookies.remove('jwt');
  //   navigate('/');
  // };

  // navigating using href to refresh the whole page so that token can be deleted 
  const handleLogout = () => {
    const cookies = new Cookies();
    cookies.remove('jwt'); // Remove the 'jwt' cookie
    cookies.remove('designation')
    window.location.href = '/'; // Redirect to the desired logout page or home page
  };
  
  
  
  return (
    <>
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/allblogs">Blogs</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/allblogs">Home</Link>
                    </li>
                    {designation === 'admin' &&
                    <li className="nav-item">
                    <Link className="nav-link" to="/addblog">Add blog</Link>
                    </li>}
                    
                </ul>
                <button className='btn btn-danger btn-sm' onClick={handleLogout}>Log out</button>
                </div>
            </div>
            </nav>
    </>
  )
}
