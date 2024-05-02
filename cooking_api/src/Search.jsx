import React, { useState } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard'; // Import the RecipeCard component
import './search.css'; // Import CSS file for styling

const Search = () => {
  const [query, setQuery] = useState(''); // State for the search query
  const [recipes, setRecipes] = useState([]); // State for storing search results

  const APP_ID = '4cbe2777'; // Application ID
  const API_KEY = 'bc6478fd3d55ac2b466629aa8a31fb13'; // API Key

  // Function to handle search input change
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch data from the API
      const response = await axios.get(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`);
      setRecipes(response.data.hits); // Update recipes state with search results
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleFormSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="recipe-container">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.recipe.uri} recipe={recipe.recipe} />
        ))}
      </div>
    </div>
  );
};

export default Search;
