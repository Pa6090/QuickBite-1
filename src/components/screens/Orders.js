import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar.js'
import Footer from '../Footer.js'

export default function Orders() {

    const [ orderData, setOrderData ] =  useState("")   
    const getOrders = async () => {

        let resp = await fetch('https://quickbite-uvnc.onrender.com/orders/getOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: localStorage.getItem("username") })
        })
        resp = await resp.json()
        setOrderData(resp)
        console.log(resp, "?????????")
    }

    useEffect(()=>{
        getOrders()
    },[])

    return (
        <div>
            <div> <Navbar /></div>
            <div className='container'>
                <div className='row'>

                    {orderData !== "" ? Array(orderData).map(data => {
                        return (
                            data.orderData 
                            ?
                            data.orderData.orderData.slice(0).reverse().map((item) => {
                                return (
                                    item.map((arrayData) => {
                                        return (
                                            <div>
                                                {arrayData.orderDate 
                                                ? 
                                                <div className='m-auto mt-5'>
                                                    {data = arrayData.orderDate}
                                                    <hr />
                                                </div> 
                                                :
                                                <div className='col-12 col-md-6 col-lg-3' >
                                                    <div className="card mt-3" style={{ width: "17rem", maxHeight: "360px" }}>
                                                        {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                            <div className="card-body" style={{"width" : "650px"}}>
                                                                <h5 className="card-title">{arrayData.name}</h5>
                                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                    <span className='m-1'>{arrayData.quantity}</span>
                                                                    <span className='m-1'>{arrayData.size}</span>
                                                                    <span className='m-1'>{data}</span>
                                                                    <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                        ₹{arrayData.price}/-
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                        )
                                    })
                                )
                            }) 
                            : <div>""</div>
                        )
                    }) : <div>""</div>}
                </div>
            </div>
            <div> <Footer /></div>
        </div>
        )
}
