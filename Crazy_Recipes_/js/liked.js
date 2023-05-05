// Function to fetch liked recipes
function fetchLikedRecipes() {
  return new Promise((resolve) => {
    const favoriteRecipesIds = loadFavoriteRecipes();
    const likedRecipes = recipesDB.filter((recipe) => favoriteRecipesIds.includes(recipe.id));
    resolve(likedRecipes);
  });
}


// Function to create and display a recipe card for each liked recipe
function displayLikedRecipes() {
  fetchLikedRecipes().then(likedRecipes => {
    const recipesContainer = document.getElementById("recipes-container");

    if (likedRecipes.length === 0) {
      recipesContainer.innerHTML = "<h2>You have no liked recipes.</h2>";
    } else {
      recipesContainer.innerHTML = '';
      likedRecipes.forEach(recipe => {
        const recipeElement = document.createElement("div");
        recipeElement.className = "recipe";

        recipeElement.addEventListener("click", (event) => {
          if (!event.target.closest(".heart-icon")) {
            window.location.href = `single-recipe-details.html?id=${recipe.id}`;
          }
        });

        const recipeImage = document.createElement("img");
        recipeImage.src = `./assets/recipes/${recipe.id}.jpeg`;
        recipeImage.className = "img recipe-img";
        recipeImage.alt = recipe.name;

        const recipeName = document.createElement("h5");
        recipeName.textContent = recipe.name;

        // Create an element 'p' for the preparation and cooking time
        const recipeTime = document.createElement("p");

        // Convert the prep and cook time to minutes
        const prepTimeInMinutes = parseInt(recipe.prepTime);
        const cookTimeInMinutes = parseInt(recipe.cookTime);

        // Calculate the total time in minutes
        const totalTime = prepTimeInMinutes + cookTimeInMinutes;

        // Set the content of the recipeTime element
        recipeTime.textContent = `Time: ${totalTime} min `;

        const recipeDetails = document.createElement("p");
        recipeDetails.innerHTML = ` ${recipe.category} | ${recipe.country}`;

        // Add your logic for calculating the average rating here
        const recipeRating = document.createElement("p");
        const averageRating = calculateAverageRating(recipe.comments);
        recipeRating.innerHTML = "Rating: ";

        for (let i = 1; i <= 5; i++) {
          const starIcon = document.createElement("i");
          starIcon.className = "fas fa-star";

          recipeRating.appendChild(starIcon);

          if (i <= averageRating) {
            starIcon.style.color = "#e2e0ff";
          } else {
            starIcon.style.color = "gray";
          }
        }

        const heartIcon = document.createElement("div");
        heartIcon.className = "heart-icon";

        const favoriteRecipes = loadFavoriteRecipes();
        const isFavorite = favoriteRecipes.includes(recipe.id);
        heartIcon.innerHTML = `<i class="${isFavorite ? "fas" : "far"} fa-heart"></i>`;

        heartIcon.addEventListener("click", (event) => {
          event.stopPropagation();
          onHeartIconClick(recipe, heartIcon);
        });

        recipeElement.appendChild(recipeImage);
        recipeElement.appendChild(recipeName);
        recipeElement.appendChild(recipeDetails);
        recipeElement.appendChild(recipeTime);
        recipeElement.appendChild(recipeRating);
        recipeElement.appendChild(heartIcon);

        recipesContainer.appendChild(recipeElement);
      });
    }
  });
}

// Fetch and display liked recipes when the page loads
document.addEventListener("DOMContentLoaded", displayLikedRecipes);
