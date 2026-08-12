import React from "react"
import ClaudeRecipe from "./components/ClaudeRecipe"
import IngredientsList from "./components/IngredientsList"
import {getRecipeFromMistral}  from "./ai"
export default function Main(){
  console.log(import.meta.env.VITE_HF_API_KEY)
  const [ingredients,setingredients]=React.useState([])
 const [recipe,setRecipe]=React.useState(false)
  //const ingredients =["Chicken", "Oregano", "Tomatoes"]
    

  function addIngredient(formData){ // would be (event) if we used onSUbmit instead of action
    // event.preventDefault() /*to prevent refreshing at every submit event*/
    // const formData = new FormData(event.currentTarget)
    const newIngredient =formData.get("ingredient")
    setingredients(prevIngredients => [...prevIngredients,newIngredient])
    console.log(ingredients)
    
  }
  async function Getrecipe(){
    const recipeMarkdown= await getRecipeFromMistral(ingredients)//setrecipeShown(!recipeShown) // setrecipeShown( state => !state)
    setRecipe(recipeMarkdown)
   
  }

  return(
    <main>
    <form action={addIngredient} className="add-ingredient-form">
      <input 
          type="text"
            placeholder="e.g oregano"
            aria-label="Add ingredient" 
            name="ingredient"
            />
      <button > Add Ingredient</button>
      </form>   
            {ingredients.length > 0 && <IngredientsList  ingredients={ingredients} Getrecipe={Getrecipe}/>}
            {recipe && < ClaudeRecipe recipe={recipe}/>}
    </main>
  )
}