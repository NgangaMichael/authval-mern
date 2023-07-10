import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Details from './components/Details'
import Editblog from './components/Editblog'
import Addblog from './components/Addblog'
import Notfound from './components/Notfound'
import Blogs from './components/Blogs'
import Loginpage from './components/Loginpage'
import Auth from './components/Auth'

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Loginpage />} />
          <Route exact path='/allblogs' element={<Auth><Blogs /></Auth>} />
          <Route exact path='/addblog' element={<Auth><Addblog /></Auth>} />
          <Route exact path='/details/:id' element={<Auth><Details /></Auth>} />
          <Route exact path='/editblog/:id' element={<Auth><Editblog /></Auth>} />
          <Route path='*' element={<Notfound />} />
        </Routes>
      </Router>
    </>
  )
}
