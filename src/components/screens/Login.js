import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar.js';

export default function Login() {

  const [credentials, setCredentials] = useState({ username: "", password: "" });

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    console.log("inside handle submit")
    e.preventDefault();
    const resp = await fetch('https://quickbite-uvnc.onrender.com/api/loginUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: credentials.username, password: credentials.password })
    })
    const res = await resp.json()
    console.log(res, ">>>>>>>>")

    if (!res.success) {
      alert("Enter valid credentials")
    }

    localStorage.setItem("authToken", res.authToken);
    localStorage.setItem("username", credentials.username);
    console.log(localStorage.getItem("authToken"))
    navigate('/')
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
    <div className='container'>
      <form className='w-50 mt-5 border rounded' onSubmit={handleSubmit}>
        <div className="m-3">
          <label htmlFor="exampleInputEmail1" className="form-label text-white">Username/Email address</label>
          <input type="email" className="form-control" name='username' value={credentials.username} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
        </div>
        <div className="m-3">
          <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
          <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn m-3 btn-primary">Login</button>
        <Link to='/signup' className='m-3 btn btn-danger'>I'm a new user</Link>
      </form>
    </div>
    </div>
  )
}
