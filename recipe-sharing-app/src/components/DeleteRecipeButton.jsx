// src/components/DeleteRecipeButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../recipeStore';

const DeleteRecipeButton = ({ recipeId }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleClick = () => {
    deleteRecipe(recipeId);
    navigate('/'); // Navigate to the home page or any other route after deletion
  };

  return (
    <button onClick={handleClick}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
