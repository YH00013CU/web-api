import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './recipeCard.css';

const RecipeCard = ({ recipe }) => {
  const [nutritionalInfo, setNutritionalInfo] = useState({
    calories: 0,
    totalFat: { amount: 0, unit: '', percentDailyValue: 0 },
    saturatedFat: { amount: 0, unit: '', percentDailyValue: 0 },
    transFat: { amount: 0, unit: '' },
    cholesterol: { amount: 0, unit: '', percentDailyValue: 0 },
    sodium: { amount: 0, unit: '', percentDailyValue: 0 },
    totalCarbohydrate: { amount: 0, unit: '', percentDailyValue: 0 },
    dietaryFiber: { amount: 0, unit: '', percentDailyValue: 0 },
    totalSugars: { amount: 0, unit: '' },
    protein: { amount: 0, unit: '', percentDailyValue: 0 },
    vitaminD: { amount: 0, unit: '', percentDailyValue: 0 },
    calcium: { amount: 0, unit: '', percentDailyValue: 0 },
    iron: { amount: 0, unit: '', percentDailyValue: 0 },
    potassium: { amount: 0, unit: '', percentDailyValue: 0 }
  });

  const APP_ID = 'a9ceaba4'; // Add your Edamam API ID
  const API_KEY = '734990770af12ad9cfd15cf5781ba460'; // Add your Edamam API Key

  useEffect(() => {
    const fetchNutritionalInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${API_KEY}&ingr=${encodeURIComponent(
            recipe.ingredients.map((ingredient) => ingredient.text).join(',')
          )}`
        );

        const totalNutrients = response.data.totalNutrients;
        const calories = response.data.calories;

        setNutritionalInfo({
          calories: calories,
          totalFat: {
            amount: totalNutrients.FAT ? totalNutrients.FAT.quantity : 0,
            unit: totalNutrients.FAT ? totalNutrients.FAT.unit : "",
            percentDailyValue: totalNutrients.FAT ? totalNutrients.FAT.daily ? totalNutrients.FAT.daily : 0 : 0
          },
          saturatedFat: {
            amount: totalNutrients.FASAT ? totalNutrients.FASAT.quantity : 0,
            unit: totalNutrients.FASAT ? totalNutrients.FASAT.unit : "",
            percentDailyValue: totalNutrients.FASAT ? totalNutrients.FASAT.daily ? totalNutrients.FASAT.daily : 0 : 0
          },
          transFat: {
            amount: totalNutrients.FATRN ? totalNutrients.FATRN.quantity : 0,
            unit: totalNutrients.FATRN ? totalNutrients.FATRN.unit : ""
          },
          cholesterol: {
            amount: totalNutrients.CHOLE ? totalNutrients.CHOLE.quantity : 0,
            unit: totalNutrients.CHOLE ? totalNutrients.CHOLE.unit : "",
            percentDailyValue: totalNutrients.CHOLE ? totalNutrients.CHOLE.daily ? totalNutrients.CHOLE.daily : 0 : 0
          },
          sodium: {
            amount: totalNutrients.NA ? totalNutrients.NA.quantity : 0,
            unit: totalNutrients.NA ? totalNutrients.NA.unit : "",
            percentDailyValue: totalNutrients.NA ? totalNutrients.NA.daily ? totalNutrients.NA.daily : 0 : 0
          },
          totalCarbohydrate: {
            amount: totalNutrients.CHOCDF ? totalNutrients.CHOCDF.quantity : 0,
            unit: totalNutrients.CHOCDF ? totalNutrients.CHOCDF.unit : "",
            percentDailyValue: totalNutrients.CHOCDF ? totalNutrients.CHOCDF.daily ? totalNutrients.CHOCDF.daily : 0 : 0
          },
          dietaryFiber: {
            amount: totalNutrients.FIBTG ? totalNutrients.FIBTG.quantity : 0,
            unit: totalNutrients.FIBTG ? totalNutrients.FIBTG.unit : "",
            percentDailyValue: totalNutrients.FIBTG ? totalNutrients.FIBTG.daily ? totalNutrients.FIBTG.daily : 0 : 0
          },
          totalSugars: {
            amount: totalNutrients.SUGAR ? totalNutrients.SUGAR.quantity : 0,
            unit: totalNutrients.SUGAR ? totalNutrients.SUGAR.unit : ""
          },
          protein: {
            amount: totalNutrients.PROCNT ? totalNutrients.PROCNT.quantity : 0,
            unit: totalNutrients.PROCNT ? totalNutrients.PROCNT.unit : "",
            percentDailyValue: totalNutrients.PROCNT ? totalNutrients.PROCNT.daily ? totalNutrients.PROCNT.daily : 0 : 0
          },
          vitaminD: {
            amount: totalNutrients.VITD ? totalNutrients.VITD.quantity : 0,
            unit: totalNutrients.VITD ? totalNutrients.VITD.unit : "",
            percentDailyValue: totalNutrients.VITD ? totalNutrients.VITD.daily ? totalNutrients.VITD.daily : 0 : 0
          },
          calcium: {
            amount: totalNutrients.CA ? totalNutrients.CA.quantity : 0,
            unit: totalNutrients.CA ? totalNutrients.CA.unit : "",
            percentDailyValue: totalNutrients.CA ? totalNutrients.CA.daily ? totalNutrients.CA.daily : 0 : 0
          },
          iron: {
            amount: totalNutrients.FE ? totalNutrients.FE.quantity : 0,
            unit: totalNutrients.FE ? totalNutrients.FE.unit : "",
            percentDailyValue: totalNutrients.FE ? totalNutrients.FE.daily ? totalNutrients.FE.daily : 0 : 0
          },
          potassium: {
            amount: totalNutrients.K ? totalNutrients.K.quantity : 0,
            unit: totalNutrients.K ? totalNutrients.K.unit : "",
            percentDailyValue: totalNutrients.K ? totalNutrients.K.daily ? totalNutrients.K.daily : 0 : 0
          }
        });
      } catch (error) {
        console.error('Error fetching nutritional information:', error);
      }
    };

    fetchNutritionalInfo();
  }, [recipe.ingredients]);

  const handleSaveRecipe = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/recipes/recipe', {
        title: recipe.label,
        ingredients: recipe.ingredients.map(ingredient => ingredient.text),
        instructions: "Write your recipe instructions here" // You need to add a way to get the instructions from the user
      });
      console.log(response.data.message); // Log success message
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  return (
    <div className="recipe-card">
      <div className="recipe-header">
        <img src={recipe.image} alt={recipe.label} className="recipe-image" />
        <h3 className="recipe-title">{recipe.label}</h3>
      </div>
      <div className="recipe-details">
        <p className="left-align section-title">Ingredients:</p>
        <ul className="ingredients-list">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.text}</li>
          ))}
        </ul>
      </div>
      <div className="additional-info">
        <p className="left-align section-title">Nutrition Facts:</p>
        <ul className="nutrition-list">
          <li><strong>Calories:</strong> {nutritionalInfo.calories}</li>
          <li><strong>Total Fat:</strong> {nutritionalInfo.totalFat.amount} {nutritionalInfo.totalFat.unit} ({nutritionalInfo.totalFat.percentDailyValue}%)</li>
          <li><strong>Saturated Fat:</strong> {nutritionalInfo.saturatedFat.amount} {nutritionalInfo.saturatedFat.unit} ({nutritionalInfo.saturatedFat.percentDailyValue}%)</li>
          <li><strong>Trans Fat:</strong> {nutritionalInfo.transFat.amount} {nutritionalInfo.transFat.unit}</li>
          <li><strong>Cholesterol:</strong> {nutritionalInfo.cholesterol.amount} {nutritionalInfo.cholesterol.unit} ({nutritionalInfo.cholesterol.percentDailyValue}%)</li>
          <li><strong>Sodium:</strong> {nutritionalInfo.sodium.amount} {nutritionalInfo.sodium.unit} ({nutritionalInfo.sodium.percentDailyValue}%)</li>
          <li><strong>Total Carbohydrate:</strong> {nutritionalInfo.totalCarbohydrate.amount} {nutritionalInfo.totalCarbohydrate.unit} ({nutritionalInfo.totalCarbohydrate.percentDailyValue}%)</li>
          <li><strong>Dietary Fiber:</strong> {nutritionalInfo.dietaryFiber.amount} {nutritionalInfo.dietaryFiber.unit} ({nutritionalInfo.dietaryFiber.percentDailyValue}%)</li>
          <li><strong>Total Sugars:</strong> {nutritionalInfo.totalSugars.amount} {nutritionalInfo.totalSugars.unit}</li>
          <li><strong>Protein:</strong> {nutritionalInfo.protein.amount} {nutritionalInfo.protein.unit} ({nutritionalInfo.protein.percentDailyValue}%)</li>
          <li><strong>Vitamin D:</strong> {nutritionalInfo.vitaminD.amount} {nutritionalInfo.vitaminD.unit} ({nutritionalInfo.vitaminD.percentDailyValue}%)</li>
          <li><strong>Calcium:</strong> {nutritionalInfo.calcium.amount} {nutritionalInfo.calcium.unit} ({nutritionalInfo.calcium.percentDailyValue}%)</li>
          <li><strong>Iron:</strong> {nutritionalInfo.iron.amount} {nutritionalInfo.iron.unit} ({nutritionalInfo.iron.percentDailyValue}%)</li>
          <li><strong>Potassium:</strong> {nutritionalInfo.potassium.amount} {nutritionalInfo.potassium.unit} ({nutritionalInfo.potassium.percentDailyValue}%)</li>
        </ul>
      </div>
      {/* Add the save recipe button */}
      <button onClick={handleSaveRecipe} className="save-recipe-button">Save Recipe</button>
    </div>
  );
};

export default RecipeCard;
