import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar.js'
import Footer from '../Footer.js'
import Card from '../Card.js'

export default function Home() {

    const [foodCategory, setFoodCategory] = useState([]);
    const [foodItems, setFoodItems] = useState([]);
    const [search, setSearch] = useState('');

    const loadOnStart = async () => {
        let resp = await fetch('https://quickbite-uvnc.onrender.com/items/foodData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        resp = await resp.json()
        setFoodItems(resp[0])
        setFoodCategory(resp[1])

    }
    console.log(foodItems, ":::::::::")

    useEffect(() => {
        loadOnStart()
    }, [])

    return (
        <div>
            <div> <Navbar /> </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ 'objectFit': 'contain !important' }}>
                    <div className="carousel-inner" id='carousel' >
                        <div className='carousel-caption' style={{ 'zIndex': '10' }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
                                {/* <button className="btn text-white" type="submit" style={{ 'backgroundColor': 'orange' }} >Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x500/?burger" className="d-block w-100 h-80" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x500/?chickenbiryani" className="d-block w-100 h-80" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x500/?starters" className="d-block w-100 h-80" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='m-3 container'>
                {
                    foodCategory.length !== 0
                        ? foodCategory.map((catg) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={catg._id} className="fs-3 m-3">
                                        {catg.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        foodItems.length !== 0
                                            ? foodItems.filter((item) => (item.CategoryName === catg.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map((mitem) => {
                                                return (
                                                    <div key={mitem._id} className='cols-12 col-md-6 col-lg-3 '>
                                                        <Card foodItem={mitem} options={mitem.options[0]} />
                                                    </div>
                                                )
                                            }) : <div>""</div>
                                    }
                                </div>
                            )
                        })
                        : <div>""</div>
                }
            </div>
            <div> <Footer /> </div>
        </div>
    )
}
