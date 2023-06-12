import React from 'react'

function Homepage() {
    const loginClick = ()=>{
        window.location.href = "http://localhost:4000/auth/google"
    }
  return (
    <div>
        <button onClick={loginClick}>
            Login
        </button>
    </div>
  )
}

export default Homepage