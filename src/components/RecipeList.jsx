import { useState, useEffect } from 'react';
import RecipeCard from "./RecipeCard"

export default function RecipeList() {

const [recipes, setRecipes] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

async function fetchRecipes() {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3000/api/recipes")
    const data = await response.json()
    setRecipes(data.recipes)
    setLoading(false)

  } catch (err) {
    setError(`Error: ${err.message}`);
    setLoading(false);
  }
}

useEffect(() => {
  // eslint-disable-next-line
  fetchRecipes()
}, [])

if (loading) return <p>Loading recipes...</p>
if (error) return <p>Error: {error}</p>

  return (
    <>
      <h1>My Recipes</h1>
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <RecipeCard recipe={recipe} />
        ))}
      </div>
    </>
  )
}