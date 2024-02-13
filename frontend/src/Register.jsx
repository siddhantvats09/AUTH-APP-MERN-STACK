import axios from 'axios'
import React, { useContext, useState } from 'react'
import UserContext from './Usercontext'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const user = useContext(UserContext)
    const navi= useNavigate()

    // async function registeruser(e){
    //     e.preventDefault()
    //     const data={email,password}
    //     await axios.post("http://localhost:4000/register",{email,password})

    // }

    const handelclick = () => {
        const data = { email, password }
        axios.post('http://localhost:4000/register', data, { withCredentials: true })
            .then((response) => {
                user.setemail(response.data.email)
            });
        setemail('')
        setpassword('')
        navi('/')
    }

    return (
        <>
            <input type="email" placeholder='email' value={email} onChange={(e) => setemail(e.target.value)} />
            <input type="password" placeholder='Password' value={password} onChange={(e) => setpassword(e.target.value)} />
            <button onClick={handelclick}>Register</button>
        </>
    )
}

export default Register