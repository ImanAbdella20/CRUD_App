import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
//user register

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({ email });

    if (userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    console.log(`User created: ${user}`);

    if (user) {
        res.status(201).json({ email: user.email, password: password });
    } else {
        res.status(400);
        throw new Error("User data not valid");
    }
});



const loginUser = asyncHandler (async (req, res) =>{

    const {email, password} = req.body;
    if (!email ||!password){
        res.status(400)
        throw new Error("All field are mandatory!")

    }
    const user = await User.findOne({email})
    // compare password with hashedpassword

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"45m"}
    )
      res.status(200).json({accessToken});  
    }else{
        res.status(401);
        throw new Error("email or password is invalid")
    }
    res.json({message:"Login user"})
})

const currentUser = asyncHandler (async (req, res) =>{
    res.json(req.user)
})

export default {registerUser, loginUser, currentUser}