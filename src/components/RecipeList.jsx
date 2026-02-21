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
    <div className="body">
      <div className="container">
        <header className="header">
          <h1 className="title">🔍 My Recipe Collection</h1>
        </header>

        <input
          className="search-input"
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <section className="difficulty-div">
          <button 
            className={`filter-btn ${selectedFilter === "all" ? "active" : ""}`} 
            onClick={() => setSelectedFilter("all")}>
            All
          </button>
          <button 
            className={`filter-btn ${selectedFilter === "easy" ? "active" : ""}`} 
            onClick={() => setSelectedFilter("easy")}>
            Easy
          </button>
          <button 
            className={`filter-btn ${selectedFilter === "medium" ? "active" : ""}`} 
            onClick={() => setSelectedFilter("medium")}>
            Medium
          </button>
          <button 
            className={`filter-btn ${selectedFilter === "hard" ? "active" : ""}`} 
            onClick={() => setSelectedFilter("hard")}>
            Hard
          </button>
        </section>

        {/* <div class="loading" id="loading">Loading recipes...</div> */}
        <article className="recipe-grid" id="recipeGrid">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </article>
      </div>
    </div>
  )
}