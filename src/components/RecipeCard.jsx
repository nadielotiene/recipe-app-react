import { Link } from 'react-router-dom'

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="recipe-card">
      <img 
        src={recipe.image && recipe.image !== 'null'
          ? `http://localhost:3000/uploads/${recipe.image}`
          : `./default-image.png`
        }
        alt={recipe.title}
      />
        <h2>{recipe.title}</h2>
        <p>By {recipe.author}</p>
        <p>Prep {recipe.prep_time}min| Cook {recipe.cook_time}min</p>
        <hr />
      </div>
    </Link>
  )
}