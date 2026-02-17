import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function RecipeDetail({ user }) {

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  
  async function fetchRecipes() {
    try {
      setLoading(true);
      setError(null);
  
      const response = await fetch(`http://localhost:3000/api/recipes/${id}`)
      const data = await response.json()
      setRecipe(data)
      setLoading(false)
  
    } catch (err) {
      setError(`Error: ${err.message}`);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    // eslint-disable-next-line
    fetchRecipes()
    // eslint-disable-next-line
  }, [id])

  async function deleteRecipe() {
    const confirmed = confirm('Are you sure you want to delete this recipe?');

    if (!confirmed) {
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3000/api/recipes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        alert('Recipe deleted successfully!');
        navigate("/"); 
      } else {
        const error = await response.json();
        alert(`Failed to delete ${error.error}`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting recipe');
    }
  }

  if (loading) { return <p>Loading...</p> }
  if (error) { return <p>Error: {error}</p> }
  if (!recipe) { return <p>Recipe not found!</p> }

  return (
    <div>
      <img src={recipe.image} alt={recipe.title} />
      <h1>{recipe.title}</h1>
      <p>By {recipe.author}</p>
      
      <p>Ingredients: {recipe.ingredients}</p>
      <p>Instructions: {recipe.instructions}</p>
      <p>Servings: {recipe.servings}</p>
      <p>Difficulty: {recipe.difficulty}</p>
      <p>Favorite: {recipe.favorite}</p>
      <p>Category: {recipe.category_id}</p>

      {user && user.id === recipe.user_id && (
        <div>
          <button onClick={() => navigate(`/edit/${id}`)}>Edit Recipe</button>
          <button onClick={deleteRecipe}>Delete Recipe</button>
        </div>
      )}
    </div>
  )
}