import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    timestamps : {
        type : Date,
        default : Date.now()
    }

})

export default mongoose.model("user", userSchema)