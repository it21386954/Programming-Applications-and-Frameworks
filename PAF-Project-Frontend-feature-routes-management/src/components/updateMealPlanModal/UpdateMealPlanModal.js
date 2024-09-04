import { useState } from "react";
import "./UpdateMealPlanModal.css";
import { updateMealPlans } from "../../util/APIUtils";
import { toast } from "react-toastify";

export default function UpdateMealPlanModal({ mealPlan, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...mealPlan });

  const handleChange = (e, context = null, recipeIndex = null, ingredientIndex = null) => {
    const { name, value } = e.target;
    if (context === "ingredients" && recipeIndex !== null && ingredientIndex !== null) {
      const updatedRecipes = formData.recipes.map((recipe, idx) => {
        if (idx === recipeIndex) {
          const updatedIngredients = recipe.ingredients.map((ingredient, iIdx) => {
            if (iIdx === ingredientIndex) {
              return { ...ingredient, [name]: value };
            }
            return ingredient;
          });
          return { ...recipe, ingredients: updatedIngredients };
        }
        return recipe;
      });
      setFormData({ ...formData, recipes: updatedRecipes });
    } else if (recipeIndex !== null) {
      const updatedRecipes = formData.recipes.map((recipe, idx) => {
        if (idx === recipeIndex) {
          return { ...recipe, [name]: value };
        }
        return recipe;
      });
      setFormData({ ...formData, recipes: updatedRecipes });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddRecipe = () => {
    const newRecipe = {
      recipeId: "",
      userId: formData.userId,
      name: "",
      ingredients: [],
      instructions: "",
      photoUrl: "",
      nutrition: { calories: "", protein: "", carbs: "", fat: "" },
      portionSize: "",
      dietaryPreferences: [],
    };
    setFormData(prev => ({ ...prev, recipes: [...prev.recipes, newRecipe] }));
  };

  const handleRemoveRecipe = (index) => {
    const updatedRecipes = formData.recipes.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, recipes: updatedRecipes }));
  };

  const handleAddIngredient = (recipeIndex) => {
    const newIngredient = { name: "", quantity: "" };
    const updatedRecipes = formData.recipes.map((recipe, idx) => {
      if (idx === recipeIndex) {
        return { ...recipe, ingredients: [...recipe.ingredients, newIngredient] };
      }
      return recipe;
    });
    setFormData({ ...formData, recipes: updatedRecipes });
  };

  const handleRemoveIngredient = (recipeIndex, ingredientIndex) => {
    const updatedRecipes = formData.recipes.map((recipe, idx) => {
      if (idx === recipeIndex) {
        const filteredIngredients = recipe.ingredients.filter((_, i) => i !== ingredientIndex);
        return { ...recipe, ingredients: filteredIngredients };
      }
      return recipe;
    });
    setFormData({ ...formData, recipes: updatedRecipes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMealPlans(formData)
      .then((response) => {
        toast("Meal plan updated successfully", { type: "success" });
        onSave(formData); // Optionally update parent component or close modal
      })
      .catch((error) => {
        toast("Update meal plan failed! " + (error.message || "Please try again!"), { type: "error" });
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Meal Plan</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </label>
          {formData.recipes.map((recipe, rIndex) => (
            <div key={rIndex}>
              <h4>Recipe: {recipe.name}</h4>
              <button type="button" onClick={() => handleRemoveRecipe(rIndex)}>Remove Recipe</button>
              <label>
                Recipe Name:
                <input type="text" name="name" value={recipe.name} onChange={(e) => handleChange(e, null, rIndex)} />
              </label>
              {recipe.ingredients.map((ingredient, iIndex) => (
                <div key={iIndex}>
                  <label>Ingredient Name:
                    <input type="text" name="name" value={ingredient.name} onChange={(e) => handleChange(e, "ingredients", rIndex, iIndex)} />
                  </label>
                  <label>Quantity:
                    <input type="text" name="quantity" value={ingredient.quantity} onChange={(e) => handleChange(e, "ingredients", rIndex, iIndex)} />
                  </label>
                  <button type="button" onClick={() => handleRemoveIngredient(rIndex, iIndex)}>Remove Ingredient</button>
                </div>
              ))}
              <button type="button" onClick={() => handleAddIngredient(rIndex)}>Add Ingredient</button>
            </div>
          ))}
          <button type="button" onClick={handleAddRecipe}>Add Recipe</button>
          <button type="submit">Update Meal Plan</button>
        </form>
      </div>
    </div>
  );
}
