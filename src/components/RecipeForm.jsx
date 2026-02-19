import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RecipeForm({ user }) {

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [image, setImage] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;

  async function handleSubmit(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in!");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);
    formData.append("prep_time", prepTime);
    formData.append("cook_time", cookTime);
    formData.append("servings", servings);
    formData.append("difficulty", difficulty);
    formData.append("category_id", categoryId);
    formData.append("favorite", favorite);

    if (image) {
      formData.append("image", image);
    }
    try {
      const url = isEditMode
        ? `http://localhost:3000/api/recipes/${id}`
        : `http://localhost:3000/api/recipes`;

        const method = isEditMode ? "PUT" : "POST";

        const response = await fetch(url, {
          method: method,
          headers: {
            "Authorization": `Bearer ${token}`
          },
          body: formData
        });

        const data = await response.json();

        if (response.ok) {
          alert(isEditMode ? "Recipe updated!" : "Recipe created!");
          navigate("/");
        } else {
          alert(data.error || "Failed to save recipe");
        }
    } catch (error ) {
      console.error("Error:", error);
      alert("Connection error");
    }
  }

  useEffect(() => {
    if (isEditMode) {
      async function fetchRecipe() {
        try {
          const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
          const recipe = await response.json();

          setTitle(recipe.title);
          setIngredients(recipe.ingredients);
          setInstructions(recipe.instructions);
          setPrepTime(recipe.prep_time);
          setCookTime(recipe.cook_time);
          setServings(recipe.servings);
          setDifficulty(recipe.difficulty);
          setCategoryId(recipe.category_id);
          setFavorite(recipe.favorite === 1);
        } catch (error) {
          console.error("Error fetching recipe:", error);
          alert("Failed to load recipe");
        }
      }
      fetchRecipe();
    }
  }, [id, isEditMode]);

  return (
    <div>
      <h1>{isEditMode ? "Edit Recipe" : "Create Recipe"}</h1> 
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Ingredients</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Instructions</label>
          <textarea 
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Prep Time (minutes)</label>
          <input 
            type="number" 
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Cook Time (minutes)</label>
          <input 
            type="number" 
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Servings</label>
          <input 
            type="number" 
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="">Select Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="1">Breakfast</option>
            <option value="2">Lunch</option>
            <option value="3">Dinner</option>
            <option value="4">Dessert</option>
            <option value="5">Snacks</option>
          </select>
        </div>

        <div>
          <label>Recipe Image</label>
          <input 
            type="file" 
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div>
          <input 
            type="checkbox" 
            checked={favorite}
            onChange={(e) => setFavorite(e.target.checked)}
          />
          <label>Mark as favorite</label>
        </div>

        <button type="submit">
          {isEditMode ? "Update Recipe" : "Create Recipe"}
        </button>
      </form>
    </div>
  )
}