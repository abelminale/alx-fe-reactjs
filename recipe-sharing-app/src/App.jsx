import React from 'react';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
//all imported
const App = () => {
  return (
    <div>
      <h1>Recipe Manager</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
};

export default App;