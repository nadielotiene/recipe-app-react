import { Link } from 'react-router-dom'

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="recipe-card">
        {recipe.image && recipe.image !== 'null' ? (
            <img 
            className="recipe-card-image" 
            src={`http://localhost:3000/uploads/${recipe.image}`}
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
        <p className="recipe-meta">Prep {recipe.prep_time}min | Cook {recipe.cook_time}min</p>
      </div>
    </Link>
  )
}