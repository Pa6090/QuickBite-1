import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    orderData : {
        type : Array,
        required : true
    },
    orderDate : {
        type : Date,
        default : Date.now()
    }
})

export default mongoose.model("Orders",orderSchema)