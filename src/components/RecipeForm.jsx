import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from '../config';

// eslint-disable-next-line
export default function RecipeForm({ user, recipe }) {

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
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

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
        ? `${API_URL}/api/recipes/${id}`
        : `${API_URL}/api/recipes`;

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

  function handleCancel() {
    navigate("/");
  }

  useEffect(() => {
    if (isEditMode) {
      async function fetchRecipe() {
        try {
          const response = await fetch(`${API_URL}/api/recipes/${id}`);
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
          setExistingImage(recipe.image);
        } catch (error) {
          console.error("Error fetching recipe:", error);
          alert("Failed to load recipe");
        }
      }
      fetchRecipe();
    }
  }, [id, isEditMode]);

  return (
    <div className="body">
      <div className="container">
        <h1 className="title">{isEditMode ? "Edit Recipe" : "Create Recipe"}</h1> 
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Recipe Title *</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Ingredients * (separate with commas)</label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Instructions * (separate with commas)</label>
            <textarea 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </div>

          <div className="form-three-rows">
            <div className="form-group">
              <label>Prep Time (minutes) *</label>
              <input 
                type="number" 
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Cook Time (minutes) *</label>
              <input 
                type="number" 
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Servings *</label>
              <input 
                type="number" 
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-two-rows">
            <div className="form-group">
              <label>Difficulty *</label>
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
            <div className="form-group">
              <label>Category *</label>
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
          </div>

          <div className="form-group">
            <label>Recipe Image (optional)</label>
            <input 
              className="img-input"
              type="file" 
              accept="image/*"
              onChange={(e) => {
                const imageFile = e.target.files[0];
                setImage(imageFile);
                if (imageFile) {
                  setImagePreview(URL.createObjectURL(imageFile));
                }
              }}
            />
            <small class="image-small">
              Max size: 5MB. Formats: JPG, PNG, GIF, WEBP
            </small>

            {imagePreview ? (
              <div className="current-image">
                <p className="image-p">Preview: </p>
                <img src={imagePreview} alt="Preview" className="create-recipe-image" />
              </div>
            ) : existingImage && existingImage !== "null" ? (
              <div className="current-image">
                <p className="image-p">Current Image: </p>
                <img 
                  className="create-recipe-image"
                  alt="Current" 
                  src={`${API_URL}/uploads/${existingImage}`} 
                />
              </div>
            ) : null}
          </div>

          <div className="form-group">
            <div className="checkbox-group">
              <label>Mark as favorite</label>
              <input 
                type="checkbox" 
                checked={favorite}
                onChange={(e) => setFavorite(e.target.checked)}
              />
            </div>
          </div>

          <div className="button-group">
            <button className="btn btn-primary" 
              to="/new-recipe" type="submit">
              {isEditMode ? "Update Recipe" : "Create Recipe"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
