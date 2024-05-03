import express from 'express';
import food_items from '../models/food_items.js';

const router = express.Router()

router.post('/createFoodItem', async (req, res) => {
    try{
        let resp = await food_items.create({
            CategoryName : req.body.categoryName,
            name : req.body.name,
            description : req.body.description,
            options : req.body.options,
            img : req.body.img
        })
        res.status(200).json(resp)
    }catch(err){
        console.log(err)
    }
})

export default router;