// src/recipeStore.js
import create from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  addFavorite: (recipeId) => set((state) => ({
    favorites: [...new Set([...state.favorites, recipeId])] // Use a Set to avoid duplicates
  })),
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId)
  })),
  recommendations: [],
  generateRecommendations: () => set((state) => {
    // Mock implementation of recommendations based on favorites
    const recommended = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return { recommendations: recommended };
  }),
}));

export default useRecipeStore;
