import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:[true,"please add user name"]
    },
    email:{
        type:String,
        required:[true,"please add the useremail address"],
        unique:[true,"email address already taken"],
    },
    password:{
        type:String,
        required:[true,"please add the user password"]
    }

},{
    timeStamps:true,
})

const User = mongoose.model("User", userSchema)

export default User;