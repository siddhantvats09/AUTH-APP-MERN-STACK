import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Register from './Register'
import Login from './Login'
import UserContext from './Usercontext'
import axios from 'axios'
import Home from './Home'

function App() {
  const [email, setemail] = useState('')

  useEffect(() => {
    axios.get("http://localhost:4000/user", { withCredentials: true })
      .then((response) => {
        setemail(response.data.email)
      })
  }, [])
  const logout = () => {
    axios.post("http://localhost:4000/logout", {}, { withCredentials: true })
      .then(() => setemail(""))

  }

  return (
    <UserContext.Provider value={{ email, setemail }}>
      <BrowserRouter>
        <div>
          <br />
         
        </div>

        <div className="nav-bar">
        <Link to="/">HOME</Link>
          {!email && (
            <>
              <Link to="/login">LOGIN</Link>
              <Link to="/register">REGISTER</Link>
            </>
          )}
          {email && (
            <>
            <Link onClick={logout}>LOG OUT</Link>
            
            </>
          )}
        </div>
        <br />

        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
