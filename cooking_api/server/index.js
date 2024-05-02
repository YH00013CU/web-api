import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/accounts.js"; // Ensure the path is correct
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json());
app.use(cors());

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            description: 'API Documentation for your backend server',
            version: '1.0.0',
        },
    },
    apis: ['./server/routes/*.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Base route for simple check
app.get('/', (req, res) => {
    res.send("hello");
});

// Use userRouter
app.use('/api', userRouter);
app.use('/api/recipes', userRouter);

// This middleware should be last: it handles all not recognized requests
app.use(function(req, res) {
    res.status(404).send("Not a Route!!");
});

// Database connection
mongoose.connect("mongodb+srv://youssef:youssef1234@youssef.sq8frnp.mongodb.net/?retryWrites=true&w=majority&appName=youssef");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("MongoDB connected successfully");
});

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // Specify the origin of the frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Starting the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
