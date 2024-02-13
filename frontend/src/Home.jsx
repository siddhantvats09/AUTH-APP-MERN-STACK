import React, { useContext } from 'react'
import UserContext from './Usercontext'

const Home = () => {

    const userinfo=useContext(UserContext)
    if(!userinfo.email){
        return 'You need to logged in !!'
    }
  return (
   <>
    <h2>Welcome Back {userinfo.email}</h2>
     <div>HOME SWEE HOME</div>
   </>
  )
}

export default Home