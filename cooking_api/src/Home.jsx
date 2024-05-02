import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Card, CardContent, CardHeader, Grid, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function Home() {
  // Sample data for recipes
  const [recipes, setRecipes] = useState([
    { id: 1, title: 'Pasta Carbonara', description: 'Classic Italian pasta dish with bacon and cheese.', cuisine: 'Italian', vegan: false, protein: 'medium', image: 'https://source.unsplash.com/400x300/?pasta' },
    { id: 2, title: 'Chicken Curry', description: 'Spicy Indian curry with tender chicken pieces.', cuisine: 'Indian', vegan: false, protein: 'high', image: 'https://source.unsplash.com/400x300/?curry' },
    { id: 3, title: 'Chocolate Cake', description: 'Moist and decadent chocolate cake with creamy frosting.', cuisine: 'International', vegan: true, protein: 'low', image: 'https://source.unsplash.com/400x300/?cake' },
    { id: 4, title: 'Tacos', description: 'Authentic Mexican tacos with seasoned meat, salsa, and guacamole.', cuisine: 'Mexican', vegan: false, protein: 'medium', image: 'https://source.unsplash.com/400x300/?tacos' },
    { id: 5, title: 'Sushi', description: 'Traditional Japanese dish with vinegared rice, seafood, and vegetables.', cuisine: 'Japanese', vegan: false, protein: 'medium', image: 'https://source.unsplash.com/400x300/?sushi' },
    { id: 6, title: 'Tofu Stir-fry', description: 'Healthy stir-fry made with tofu, vegetables, and savory sauce.', cuisine: 'Asian', vegan: true, protein: 'medium', image: 'https://source.unsplash.com/400x300/?tofu' },
    { id: 7, title: 'Greek Salad', description: 'Refreshing salad with tomatoes, cucumbers, olives, and feta cheese.', cuisine: 'Greek', vegan: false, protein: 'low', image: 'https://source.unsplash.com/400x300/?salad' },
    // Add more recipes here...
    { id: 8, title: 'Hamburger', description: 'Classic American burger with beef patty, lettuce, tomato, onion, and pickles.', cuisine: 'American', vegan: false, protein: 'high', image: 'https://source.unsplash.com/400x300/?burger' },
    { id: 9, title: 'Margarita Pizza', description: 'Simple yet delicious pizza topped with tomato sauce, mozzarella cheese, and fresh basil.', cuisine: 'Italian', vegan: false, protein: 'medium', image: 'https://source.unsplash.com/400x300/?pizza' },
    { id: 10, title: 'Pad Thai', description: 'Thai stir-fried noodles with shrimp, tofu, bean sprouts, and peanuts.', cuisine: 'Thai', vegan: false, protein: 'medium', image: 'https://source.unsplash.com/400x300/?food' },
    { id: 11, title: 'Vegetable Curry', description: 'Flavorful curry made with mixed vegetables, coconut milk, and aromatic spices.', cuisine: 'Indian', vegan: true, protein: 'medium', image: 'https://source.unsplash.com/400x300/?curry' },
    { id: 12, title: 'Ratatouille', description: 'Classic French vegetable dish made with tomatoes, eggplant, zucchini, bell peppers, and onions.', cuisine: 'French', vegan: true, protein: 'low', image: 'https://source.unsplash.com/400x300/?ratatouille' },
    { id: 13, title: 'Caesar Salad', description: 'Crunchy romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.', cuisine: 'International', vegan: false, protein: 'medium', image: 'https://source.unsplash.com/400x300/?salad' },
    { id: 14, title: 'Mushroom Risotto', description: 'Creamy Italian rice dish cooked with mushrooms, onions, garlic, and white wine.', cuisine: 'Italian', vegan: false, protein: 'medium', image: 'https://source.unsplash.com/400x300/?risotto' },
    { id: 15, title: 'Falafel Wrap', description: 'Middle Eastern wrap filled with falafel balls, hummus, tahini sauce, and fresh veggies.', cuisine: 'Middle Eastern', vegan: true, protein: 'medium', image: 'https://source.unsplash.com/400x300/?falafel' },
    // Add more recipes here...
    // ... and so on
  ]);

  const [filter, setFilter] = useState({
    cuisine: '',
    isVegan: null,
    proteinLevel: '',
  });

  // Function to filter recipes
  const filterRecipes = (recipe) => {
    const { cuisine, isVegan, proteinLevel } = filter;
    if (cuisine && recipe.cuisine !== cuisine) return false;
    if (isVegan !== null && recipe.vegan !== isVegan) return false;
    if (proteinLevel && recipe.protein !== proteinLevel) return false;
    return true;
  };

  // Handler for changing filter options
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  // Handler for resetting filter
  const handleResetFilter = () => {
    setFilter({
      cuisine: '',
      isVegan: null,
      proteinLevel: '',
    });
  };

  return (
    <div>
      <AppBar position="static" sx={{ marginBottom: '20px' }}>
        <Toolbar>
          <Typography variant="h6" component="div">
            Recipes
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ padding: '20px' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Explore Our Recipes</h2>
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <FormControl sx={{ minWidth: 120, marginRight: '10px' }}>
            <InputLabel id="cuisine-label">Cuisine</InputLabel>
            <Select
              labelId="cuisine-label"
              id="cuisine-select"
              value={filter.cuisine}
              name="cuisine"
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Italian">Italian</MenuItem>
              <MenuItem value="Indian">Indian</MenuItem>
              <MenuItem value="International">International</MenuItem>
              <MenuItem value="Mexican">Mexican</MenuItem>
              <MenuItem value="Japanese">Japanese</MenuItem>
              <MenuItem value="Asian">Asian</MenuItem>
              <MenuItem value="Greek">Greek</MenuItem>
              <MenuItem value="American">American</MenuItem>
              <MenuItem value="Thai">Thai</MenuItem>
              <MenuItem value="French">French</MenuItem>
              <MenuItem value="Middle Eastern">Middle Eastern</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120, marginRight: '10px' }}>
            <InputLabel id="vegan-label">Vegan</InputLabel>
            <Select
              labelId="vegan-label"
              id="vegan-select"
              value={filter.isVegan === null ? '' : filter.isVegan}
              name="isVegan"
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120, marginRight: '10px' }}>
            <InputLabel id="protein-label">Protein Level</InputLabel>
            <Select
              labelId="protein-label"
              id="protein-select"
              value={filter.proteinLevel}
              name="proteinLevel"
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleResetFilter}>Reset Filter</Button>
        </div>
        <Grid container spacing={3}>
          {recipes.filter(filterRecipes).map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.id}>
              <Card sx={{ height: '100%' }}>
                <CardHeader title={recipe.title} sx={{ textAlign: 'center' }} />
                <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '100%', height: 'auto' }} />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {recipe.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Home;
