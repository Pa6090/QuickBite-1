import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar.js';
import dotenv from 'dotenv';

dotenv.config()
export default function Signup() {
    
    const [credentials, setCredentials] = useState({name:"", username:"", password:"", location:""});

    const handleSubmit = async (e) => {
        console.log("inside handle submit")
        e.preventDefault();
        const resp = await fetch(`${process.env.BACKEND}/api/createUser`, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json' 
            },
            body : JSON.stringify({name:credentials.name,username:credentials.username,password:credentials.password,location:credentials.location})
        })
        const res =await resp.json()
        console.log(res,">>>>>>>>")

        if(!res.success){
            alert("Enter valid credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]:e.target.value})
    }

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
            <div>
            <Navbar />
            </div>

        <div className="container">
            <form className='w-50 border rounded mt-3' onSubmit={handleSubmit}>
                <div className="m-3">
                    <label htmlFor="name" className="form-label text-white">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
                </div>
                <div className="m-3">
                    <label htmlFor="exampleInputEmail1" className="form-label text-white">Username/Email address</label>
                    <input type="email" className="form-control"  name='username' value={credentials.username} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
                </div>
                <div className="m-3">
                    <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
                </div>
                <div className="m-3">
                    <label htmlFor="location" className="form-label text-white">Location</label>
                    <input type="text" className="form-control" name='location' value={credentials.location} onChange={onChange}/>
                </div>
                <button type="submit" className="btn m-3 btn-primary">Register</button>
                <Link to='/login' className='m-3 btn btn-danger'>Already a user</Link>
            </form>
        </div>
        </div>
    )
}
