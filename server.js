import express from "express";
import dotenv from 'dotenv';
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from './config/dbConnection.js'

connectDB();
dotenv.config();
const app = express()
const port = process.env.PORT;

app.use(express.json())//provide a data parser for data recieved from the client
app.use("/api/contacts", contactRoutes)
app.use("/api/users", userRoutes)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on port number: ${port}`);
});
