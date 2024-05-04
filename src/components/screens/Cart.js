import React from 'react'
import { useCart, useDispatchCart } from '../ContextReducer.js'

export default function Cart() {

    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center text-white fs-3'>The Cart is Empty</div>
            </div>
        )
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    const onCheckOut = async () => {
        let username = localStorage.getItem("username")

        let resp = await fetch('https://quickbite-uvnc.onrender.com/orders/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({username : username, orderData : data, orderDate: new Date().toDateString()})
        })
        console.log(">>>", resp)
        if(resp.status === 200) {
            dispatch({type:"DROP"})
        }
    }
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody className='text-white'>
                        {data.map((food, index) => {
                            return (
                                <tr>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.quantity}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td><button type='button' className='btn p-0'>
                                    <button className='bi bi-trash h-100'  onClick={() => { dispatch({ type: "REMOVE", index: index }) }} />
                                    </button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-white'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn mt-5' style={{ backgroundColor: 'orange' }} onClick={onCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    )
}
