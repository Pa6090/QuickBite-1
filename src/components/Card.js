import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer.js'

export default function Card(props) {

    let options = props.options
    let priceOptions = Object.keys(options)
    let dispatch = useDispatchCart()
    let data = useCart()

    const priceRef = useRef();
    const [quantity, setQuantity] = useState(1)
    const [size, setSize] = useState("")

    const handleCart = async () => {
        let food = []
        for (const item of data){
            if(item.id === props.foodItem._id){
                food = item;
                break;
            }
        }
        if(food.length !== 0){
            if(food.size === size){
                await dispatch({type: "UPDATE", id: props.foodItem._id, price: totalPrice, qty: quantity })
                return
            }
        }
        else if(food.size !== size){
            await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price:totalPrice, quantity:quantity, size:size })
            return
        }
        return
        await dispatch({type:"ADD", id:props.foodItem._id, name:props.foodItem.name, price:totalPrice, quantity:quantity, size:size })

    }

    useEffect(()=>{
        setSize(priceRef.current.value)
    }, [])

    const totalPrice = quantity * parseInt(options[size])
    return (
        <div>
            <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{height:"200px", objectFit:"fill"}}/>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    {/* <p className="card-text">{props.desc}</p> */}
                    <div className='container w-100'>
                        <select className='m-2 h-100 w-10 rounded' onChange={(e)=> setQuantity(e.target.value)} style={{ 'backgroundColor': 'bs-secondary-bg' }}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>

                        <select className='m-2 h-100 w-10 rounded' ref={priceRef} onChange={(e)=> setSize(e.target.value)} style={{ 'backgroundColor': 'bs-secondary-bg' }}>
                            {priceOptions.map((p) => {
                                return (
                                    <option key={p} value={p}>{p}</option>
                                )
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            Rs.{totalPrice}/-
                        </div>
                    </div>
                    {/* <hr/> */}
                    <button className='btn btn-outline-secondary btn-light justify-center ms-2' onClick={handleCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
