import express from 'express'
import Orders from '../models/orders.js'

const router = express.Router()

router.post('/createOrder', async (req, res) => {
    let data = req.body.orderData
    await data.splice(0, 0, {orderDate : req.body.orderDate})
    
    let username = await Orders.findOne({'username' : req.body.username})
    if(username === null){
        try{
            let resp = await Orders.create({
                username: req.body.username,
                orderData : [data]
            })
            res.status(200).json(resp)
        }catch(err){
            console.log(err)
        }
    }else{
        try{
            await Orders.findOneAndUpdate({ username : req.body.username},
            { $push : { orderData : data }}).then(()=>{
                res.json({success : true})
            })
        }catch(err){
            console.log(err)
        }
    }
    
})

router.post('/getOrders', async(req, res) => {
    try{
        let data = await Orders.findOne({ username : req.body.username })
        res.json({orderData:data})
    }catch(err){
        console.log(err)
    }
})


export default router;