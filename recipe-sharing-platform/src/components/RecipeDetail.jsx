import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch the recipe details from the mock data
    fetch('/src/data.json')
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find((r) => r.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error('Error fetching recipe details:', error));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover mb-8 rounded-lg shadow-md" />
      <p className="text-lg mb-4">{recipe.summary}</p>
      <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
      <ul className="list-disc pl-5 mb-6">
        {/* Add mock ingredients */}
        <li>Ingredient 1</li>
        <li>Ingredient 2</li>
        <li>Ingredient 3</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
      <ol className="list-decimal pl-5">
        {/* Add mock instructions */}
        <li>Step 1: Do this...</li>
        <li>Step 2: Do that...</li>
        <li>Step 3: Enjoy!</li>
      </ol>
    </div>
  );
};

export default RecipeDetail;
