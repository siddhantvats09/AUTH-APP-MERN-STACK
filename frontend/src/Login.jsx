import axios from 'axios'
import React, { useContext, useState } from 'react'
import UserContext from './Usercontext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const user = useContext(UserContext)
  const [error, seterror] = useState(false)
  const navi= useNavigate()


  const handelclick = async () => {
    const data = { email, password }
    try{
      await axios.post('http://localhost:4000/login', data, { withCredentials: true })
      .then((response) => {
        user.setemail(response.data.email)
        setemail('')
        setpassword('')
        seterror(false)
        navi('/')
      });
    }
    catch{
      seterror(true)

    }
      
    

  }
return (
  <>
  {error ?(<h1>Email or Password is Wrong</h1>):(<></>)}
    <input type="email" placeholder='email' value={email} onChange={(e) => setemail(e.target.value)} />
    <input type="password" placeholder='Password' value={password} onChange={(e) => setpassword(e.target.value)} />
    <button onClick={handelclick}>Login</button>
  </>
)
}

export default Login