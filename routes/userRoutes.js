import express from 'express'
import userController from '../controllers/userController.js'
import validateToken from '../middleware/validateTokenHandler.js'
const router = express.Router()

router.post("/register", userController.registerUser)

router.post("/login", userController.loginUser)

router.get("/current", validateToken, (req, res) => {
    console.log(req.user); 
    res.json(req.user); // Send the user information back in the response
});

export default router