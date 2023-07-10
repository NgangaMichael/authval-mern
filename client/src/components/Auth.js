import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function Auth({ children }) {
  const cookies = new Cookies();
  const jwtCookie = cookies.get('jwt'); // Retrieve the value of the 'jwt' cookie

  if (jwtCookie) {
    return children; // Render the children component if the 'jwt' cookie is available
  }

  return <Navigate to="/" />; // Redirect to the desired page (e.g., login page)
}




// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import Cookies from 'universal-cookie';

// export default function Auth({ children }) {
//   const cookies = new Cookies();
//   const jwtCookie = cookies.get('jwt'); // Retrieve the value of the 'jwt' cookie

//   if (jwtCookie) {
//     const expiry = JSON.parse(atob(jwtCookie.split('.')[1])).exp;
//     const now = Date.now();

//     if (now > expiry * 1000) {
//       return <Navigate to="/" />; // Redirect to the desired page (e.g., login page)
//     } else {
//       return children; // Render the children component if the 'jwt' cookie is available and not expired
//     }
//   }

//   return null; // Handle the case when the 'jwt' cookie is not available
// }