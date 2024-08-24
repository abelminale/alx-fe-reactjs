
const useRecipeStore = create((set) => ({
  recipes: [],
  searchTerm: '',
  ingredientFilter: '',
  filteredRecipes: [],

  setSearchTerm: (term) => set((state) => {
    const searchTerm = term.toLowerCase();
    const filteredRecipes = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm)
    );
    return { searchTerm, filteredRecipes };
  }),

  setIngredientFilter: (ingredient) => set((state) => {
    const ingredientFilter = ingredient.toLowerCase();
    const filteredRecipes = state.recipes.filter(recipe =>
      recipe.ingredients.some(ing => ing.toLowerCase().includes(ingredientFilter))
    );
    return { ingredientFilter, filteredRecipes };
  }),

  filterRecipes: () => set((state) => {
    const searchTerm = state.searchTerm.toLowerCase();
    const ingredientFilter = state.ingredientFilter.toLowerCase();
    const filteredRecipes = state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(searchTerm) &&
      recipe.ingredients.some(ing => ing.toLowerCase().includes(ingredientFilter))
    );
    return { filteredRecipes };
  }),

  setRecipes: (recipes) => set({ recipes, filteredRecipes: recipes }),
}));
