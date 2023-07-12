import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Details from './components/Details'
import Editblog from './components/Editblog'
import Addblog from './components/Addblog'
import Notfound from './components/Notfound'
import Blogs from './components/Blogs'
import Loginpage from './components/Loginpage'
import Profile from './components/Profile'
import Auth from './components/Auth'
import Adduser from './components/Adduser'
import Allusers from './components/Allusers'
import Edituser from './components/Edituser'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Loginpage />} />
          <Route exact path='/allblogs' element={<Auth><Blogs /></Auth>} />
          <Route exact path='/adduser' element={<Auth><Adduser /></Auth>} />
          <Route exact path='/edituser/:id' element={<Auth><Edituser /></Auth>} />
          <Route exact path='/allusers' element={<Auth><Allusers /></Auth>} />
          <Route exact path='/profile' element={<Auth><Profile /></Auth>} />
          <Route exact path='/addblog' element={<Auth><Addblog /></Auth>} />
          <Route exact path='/details/:id' element={<Auth><Details /></Auth>} />
          <Route exact path='/editblog/:id' element={<Auth><Editblog /></Auth>} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Router>
    </>
  )
}
