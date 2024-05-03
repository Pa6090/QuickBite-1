import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Badge} from 'react-bootstrap';
import Model from '../Model.js';
import Cart from './screens/Cart.js';
import { useCart } from './ContextReducer.js';

export default function Navbar() {

  let data = useCart()
  const navigate = useNavigate()
  const [cartView, setCartView] = useState(false);
  const handleLogout = () => {
    (localStorage.removeItem("authToken"))
    navigate('/')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" style={{ 'backgroundColor': 'orange' }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1" to="/">QuickBite</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                <Link className="nav-link active fs-5 bg-white text-black btn mx-2" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken"))
                ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5 bg-white text-black btn mx-2" aria-current="page" to="/myOrder">My Orders</Link>
                </li>
                : ""
              }
            </ul>
            <div className='d-flex'>
              {(localStorage.getItem("authToken")) ?
                <div>
                  <div className="btn bg-white fs-5 mx-1" onClick={handleLogout}>Logout</div>
                  <div className="btn bg-white fs-5 mx-1" onClick={()=>{setCartView(true)}}>
                    My Cart {" "}
                    <Badge pill bg='danger' > {data.length} </Badge>
                  </div>
                  {cartView ? <Model onClose={()=>setCartView(false)}> <Cart/></Model> : null}
                </div>
                : <div>
                  <Link className="btn bg-white fs-5 mx-1" to="/login">Login</Link>
                  <Link className="btn bg-white fs-5 mx-1" to="/signup">SignUp</Link>
                </div>}
            </div>
          </div>
        </div>
      </nav>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
    </div>
  )
}
