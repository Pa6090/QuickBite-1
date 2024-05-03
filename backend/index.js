import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoute from './Routes/createUser.js';
import itemsRoute from './Routes/displayData.js';
import ordersRoute from './Routes/createOrder.js'
import foodItemsRoute from './Routes/createFoodItem.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config()

const port = process.env.PORT;
const app = express()

app.use(cors({
            origin : ["http://localhost:3000/"],
            methods : ["POST", "GET"],
            credentials : true
        })
)

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use(express.json())
app.use(cookieParser())

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB")
        const foodItemsData = await (await mongoose.connection.db.collection("food_items")).find({}).toArray();
        const foodCategory = await (await mongoose.connection.db.collection("food_category")).find({}).toArray();
        global.foodData = [foodItemsData, foodCategory]
    } catch(error){
        throw error
    }
}
mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected !!")
})

mongoose.connection.on("connected", ()=>{
    console.log("Connected to MongoDB")
})

app.get('/', (req, res)=> { res.status(200).json({"message" : "Hey, Please Work"})})
app.use('/api', userRoute)
app.use('/items', itemsRoute)
app.use('/orders', ordersRoute)
app.use('/foodItems', foodItemsRoute)

app.listen(port, ()=>{
    connect()
    console.log("Connected to backend", port)
})
