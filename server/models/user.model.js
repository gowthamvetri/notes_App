import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name : {
        type:String,
    },
    email: {
        type : String,
    },
    password: {
        type : String,
    },
},{
    timestamps:true
})

const userModel = mongoose.model('user',UserSchema);

export default userModel;