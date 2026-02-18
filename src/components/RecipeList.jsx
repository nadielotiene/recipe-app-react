import { useState, useEffect } from 'react';
import RecipeCard from "./RecipeCard"

export default function RecipeList() {

const [recipes, setRecipes] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [selectedFilter, setSelectedFilter] = useState("all");
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

const filteredRecipes = recipes.filter(recipe => {
  const matchesSearch =
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.author.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesFilter = 
    selectedFilter === "all" ||
    recipe.difficulty === selectedFilter;

  return matchesSearch && matchesFilter;
});

  return (
    <>
      <div className="recipe-grid">
        <h1>My Recipes</h1>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <br />
        <br />
        <button onClick={() => setSelectedFilter("all")}>All</button>
        <button onClick={() => setSelectedFilter("easy")}>Easy</button>
        <button onClick={() => setSelectedFilter("medium")}>Medium</button>
        <button onClick={() => setSelectedFilter("hard")}>Hard</button>
      </div>
        {filteredRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
    </>
  )
}