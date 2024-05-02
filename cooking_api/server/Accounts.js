import mongoose from "mongoose";
const Userschema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }
);
const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
});

export const RecipeModel = mongoose.model("recipes", RecipeSchema);
export const UserModel = mongoose.model("accounts", Userschema);
