import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Extract the token
        console.log("Token:", token); // Log the token for debugging

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error("Token verification failed:", err); // Log the error
                return res.status(401).json({ message: "User is not authorized, token failed" });
            }
            req.user = decoded.user; // Attach decoded user to request object
            console.log("Decoded user:", decoded.user); // Log the decoded user
            next(); // Proceed to the next middleware
        });
    } else {
        console.error("No token provided"); // Log the absence of token
        return res.status(401).json({ message: "User is not authorized, no token" });
    }
});

export default validateToken;
