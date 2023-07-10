import React , {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useFetch from './useFetch';
import Navbar from './Navbar';
import Cookies from 'universal-cookie';


export default function Details() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {blogs, pending, error} = useFetch(`http://localhost:5000/details/${id}`)
    const [designation, setDesignation] = useState(''); // State to store the user's designation
    const cookies = new Cookies();

    useEffect(() => {
        const userDesignation = cookies.get('designation');
        setDesignation(userDesignation); // Retrieve the user's designation from the cookie
      }, []);

    const deleteblog = async () => {
        fetch(`http://localhost:5000/deleteblog/${id}`, {
            method: "DELETE",
        })
        .then(navigate('/'))
    }

  return (
    <>
        <Navbar />
        <div className='container mt-3'>
        {pending && <div>Loading...</div>}
        {blogs && (
            <div className='row'>
                <div className='col-md-8'>
                    <img className='img-fluid' src={`http://localhost:5000/blogimages/${blogs.image}`} alt="..."
                    style={{width: '40rem'}}
                    />
                    <h5 className='mt-3'>Title: {blogs.title}</h5>
                    <p>Subtitle: {blogs.subtitle}</p>
                    <h6>Author: {blogs.author}</h6>
                    <p>{blogs.body}</p>
                    <p>Date: {blogs.createdAt}</p>
                    {designation === 'admin' &&
                        <div>
                            <Link to={`/editblog/${blogs._id}`}>Edit</Link> <br /> 
                            <button className='btn btn-danger btn-sm' onClick={deleteblog}>Delete Blog</button>
                        </div>
                    }
                </div>
            </div>
        )}
        {error && <div>{error}</div>}
    </div>
    </>
  )
}