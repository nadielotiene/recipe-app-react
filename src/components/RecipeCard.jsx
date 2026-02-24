import { Link } from 'react-router-dom';
import { API_URL } from '../config';

export default function RecipeCard({ recipe }) {
  return (
    <Link className="link-tag" to={`/recipe/${recipe.id}`}>
      <div className="recipe-card">
        {recipe.image && recipe.image !== 'null' ? (
          <img 
            className="recipe-card-image" 
            src={`${API_URL}/uploads/${recipe.image}`}
            alt={recipe.title}
          />
        ) : (
          <img 
            className="recipe-card-image default-image" 
            src="/default-image.png" 
            alt="recipe image"
          />
        )}
        <h2 className="recipe-title">{recipe.title}</h2>
        <span className={`category-badge ${recipe.category_name.toLowerCase()}`}>
          {recipe.category_name}
        </span>
        <p className="recipe-meta">By {recipe.author}</p>
        <p className="recipe-meta">Prep <strong>{recipe.prep_time}</strong> min | Cook <strong>{recipe.cook_time}</strong> min</p>
      </div>
    </Link>
  )
}