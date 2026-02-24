import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../config';
import Loading from './Loading';

export default function RecipeDetail({ user }) {

  const [recipe, setRecipe] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  
  async function fetchRecipes() {
    try {
      setLoading(true);
      setError(null);
  
      const response = await fetch(`${API_URL}/api/recipes/${id}`)
      const data = await response.json()
      setRecipe(data)
      setLoading(false)
  
    } catch (err) {
      setError(`Error: ${err.message}`);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchRecipes()
    // eslint-disable-next-line
  }, [id])

  async function deleteRecipe() {
    const confirmed = confirm('Are you sure you want to delete this recipe?');

    if (!confirmed) return;
  
    setDeleting(true);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_URL}/api/recipes/${id}`, {
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
    } finally {
      setDeleting(false);
    }
  }

 if (loading) {
  return (
    <div className="body">
      <div className="container">
        <Loading message="Loading recipes..." />
      </div>
    </div>
  )
}
  if (error) return <p>Error: {error}</p>
  if (!recipe) return <p>Recipe not found!</p>

  return (
    <div className="body">
      <main className="main">
        <img 
          className="recipe-image"
          src={recipe.image && recipe.image !== "null"
            ? `${API_URL}/uploads/${recipe.image}`
            : `/default-image.png`
          } 
          alt={recipe.title} 
        />
        <h1 className="title">{recipe.title}</h1>
        <p className="recipe-author">By {recipe.author}</p>
        <span className={`category-badge ${recipe.category_name.toLowerCase()}`}>
          {recipe.category_name}
        </span>
        
        <section className="prep-time">
          <h2 className="prep-time-title">Preparation time</h2>
          <ul>
            <li><span className="bullet-space"><strong>Total</strong>: Approximately {recipe.prep_time + recipe.cook_time} minutes</span></li>
            <li><span className="bullet-space"><strong>Preparation</strong>: {recipe.prep_time} minutes</span></li>
            <li><span className="bullet-space"><strong>Cooking</strong>: {recipe.cook_time} minutes</span></li>
            <li><span className="bullet-space"><strong>Servings</strong>: {recipe.servings}</span></li>
          </ul>
        </section>

        <h2 class="sub-heading">Ingredients</h2>
        <ul>
          {recipe.ingredients.split(", ").map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>

        <div className="hr"></div>

        <h2 class="sub-heading">Instructions</h2>
        <ol>
           {recipe.instructions.split(", ").map((instruction, index) => (
            <li key={index}>{instruction}</li>
           ))}
        </ol>
        
        {/* <p>Difficulty: {recipe.difficulty}</p> */}
        {/* <p>Favorite: {recipe.favorite}</p> */}

        {user && user.id === recipe.user_id && (
          <div className="owner-actions">
            <button class="btn btn-edit" onClick={() => navigate(`/edit/${id}`)}>
              Edit Recipe
            </button>
            <button class="btn btn-delete" onClick={deleteRecipe}disabled={deleting}>
              {deleting ? "Deleting..." : "Delete Recipe"}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}