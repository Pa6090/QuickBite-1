import express from 'express';
import food_items from '../models/food_items.js';

const router = express.Router()

router.post('/foodData', async (req, res) => {
    try{
        let resp = await food_items.find()
        global.foodData[0] = resp
        res.send(global.foodData)
    }catch(err){
        console.log(err.message)
        res.send("Server Error", err)
    }
})

export default router