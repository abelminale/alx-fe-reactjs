import { Link } from 'react-router-dom';

// Inside the map for displaying recipes
<Link to={`/recipe/${recipe.id}`} key={recipe.id}>
  <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
    <img src={recipe.image} alt={recipe.title} className="w-full h-32 object-cover" />
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
      <p className="text-gray-600">{recipe.summary}</p>
    </div>
  </div>
</Link>
