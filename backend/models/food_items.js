import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema({
    CategoryName : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    options : {
        type : Array,
        required : true
    },
    img : {
        type : String,
        required : true
    },
})

export default mongoose.model("food_items",itemsSchema);