
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import useRecipeStore from '../recipeStore';
import SearchBar from './SearchBar';
import IngredientFilter from './IngredientFilter';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const ingredientFilter = useRecipeStore((state) => state.ingredientFilter);

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, ingredientFilter, filterRecipes]);

  return (
    <div>
      <SearchBar />
      <IngredientFilter />
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link> {/* Link to recipe details */}
            </h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
};

export default RecipeList;
