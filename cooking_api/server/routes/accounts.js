import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../Accounts.js';
import { RecipeModel } from '../Accounts.js'; // Import the RecipeModel
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = express.Router();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            description: 'API Documentation for your backend server',
            version: '1.0.0',
        },
    },
    apis: ['./server/routes/accounts.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       409:
 *         description: User already exists
 *       500:
 *         description: Error registering user
 */
router.post("/register", async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username: username });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login
 *     description: Login with username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Wrong password
 *       404:
 *         description: User not found
 *       500:
 *         description: Error logging in
 */
router.post("/login", async(req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Wrong password" });
        }

        const token = jwt.sign({ id: user._id }, "secret");
        res.json({ token, userID: user._id, message: "Welcome" });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

/**
 * @swagger
 * /api/recipe:
 *   post:
 *     summary: Save a new recipe
 *     description: Save a new recipe with title, ingredients, and instructions.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *               instructions:
 *                 type: string
 *     responses:
 *       201:
 *         description: Recipe saved successfully
 *       500:
 *         description: Error saving recipe
 */
router.post("/recipe", async(req, res) => {
    const { title, ingredients, instructions } = req.body;

    try {
        const newRecipe = new RecipeModel({ title, ingredients, instructions });
        await newRecipe.save();
        res.status(201).json({ message: "Recipe saved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving recipe" });
    }
});

export { router as userRouter };
