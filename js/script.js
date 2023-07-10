"use strict";

class Recipe {
    constructor(name, ingredients, instructions, cookingTime) {
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.cookingTime = cookingTime;
    }

    isValid() {
        return (
            this.name &&
            this.ingredients &&
            this.instructions &&
            this.cookingTime &&
            this.ingredients.length > 0
        );
    }
}

class RecipeBook {
    constructor() {
        this.recipes = [];
    }

    addRecipe(recipe) {
        if (recipe.isValid()) {
            this.recipes.push(recipe);
            this.displayRecipes();
            console.log(`Рецепт "${recipe.name}" додано.`);
        } else {
            console.log(`Неправильний рецепт "${recipe.name}".`);
        }
    }

    findRecipesByTime(cookingTime) {
        const matchingRecipes = this.recipes.filter(
            (recipe) => recipe.cookingTime <= cookingTime
        );

        if (matchingRecipes.length === 0) {
            console.log("Не знайдено рецептів з таким часом приготування.");
        } else {
            console.log(`Рецепти з часом приготування до ${cookingTime} хвилин:`);
            matchingRecipes.forEach((recipe) => console.log(recipe.name));
        }
    }

    findRecipesByIngredients(ingredients) {
        const matchingRecipes = this.recipes.filter((recipe) => {
            return ingredients.every((ingredient) =>
                recipe.ingredients.includes(ingredient)
            );
        });

        if (matchingRecipes.length === 0) {
            console.log("Рецепти з вказаними інгрідієнтами не знайдені.");
        } else {
            console.log("Рецепти з вказаними інгрідієнтами:");
            matchingRecipes.forEach((recipe) => console.log(recipe.name));
        }
    }

    displayRecipes() {
        const recipesList = document.getElementById("recipes");
        recipesList.innerHTML = "";

        this.recipes.forEach((recipe) => {
            const recipeItem = document.createElement("li");
            recipeItem.textContent = recipe.name;

            recipeItem.addEventListener("click", () => {
                this.displayRecipeDetails(recipe);
            });

            recipesList.appendChild(recipeItem);
        });
    }

    displayRecipeDetails(recipe) {
        const recipeName = document.getElementById("recipeName");
        const recipeIngredients = document.getElementById("recipeIngredients");
        const recipeInstructions = document.getElementById("recipeInstructions");
        const recipeCookingTime = document.getElementById("recipeCookingTime");

        recipeName.textContent = recipe.name;
        recipeIngredients.textContent = `Інгрідієнти: ${recipe.ingredients.join(
            ", "
        )}`;
        recipeInstructions.textContent = `Інструкція приготування: ${recipe.instructions}`;
        recipeCookingTime.textContent = `Час приготування: ${recipe.cookingTime} хв.`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const recipeBook = new RecipeBook();

    const nameInput = document.getElementById("name");
    const ingredientsInput = document.getElementById("ingredients");
    const instructionsInput = document.getElementById("instructions");
    const cookingTimeInput = document.getElementById("cookingTime");
    const addRecipeBtn = document.getElementById("addRecipeBtn");

    const timeSearchInput = document.getElementById("timeSearch");
    const searchByTimeBtn = document.getElementById("searchByTimeBtn");

    const ingredientsSearchInput = document.getElementById("ingredientsSearch");
    const searchByIngredientsBtn = document.getElementById("searchByIngredientsBtn");

    addRecipeBtn.addEventListener("click", () => {
        const name = nameInput.value;
        const ingredients = ingredientsInput.value.split(",");
        const instructions = instructionsInput.value;
        const cookingTime = parseInt(cookingTimeInput.value);

        const recipe = new Recipe(name, ingredients, instructions, cookingTime);
        recipeBook.addRecipe(recipe);

        nameInput.value = "";
        ingredientsInput.value = "";
        instructionsInput.value = "";
        cookingTimeInput.value = "";
    });

    searchByTimeBtn.addEventListener("click", () => {
        const cookingTime = parseInt(timeSearchInput.value);
        recipeBook.findRecipesByTime(cookingTime);
    });

    searchByIngredientsBtn.addEventListener("click", () => {
        const ingredients = ingredientsSearchInput.value.split(",");
        recipeBook.findRecipesByIngredients(ingredients);
    });
});
