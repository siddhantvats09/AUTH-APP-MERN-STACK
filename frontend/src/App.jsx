import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Register from './Register'
import Login from './Login'
import UserContext from './Usercontext'
import axios from 'axios'

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
          {!!email && (
            <div>Logined in as {email}
              <button onClick={logout}>Log Out</button>
            </div>

          )}
          {!email && (
            <div>not loged in</div>
          )}
          <br />
          <hr />
        </div>

        <div className="nav-bar">
          <Link to='/'>Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </div>

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
