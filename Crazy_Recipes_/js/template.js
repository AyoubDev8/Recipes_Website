const getElement = (selector) => {
  const element = document.querySelector(selector)

  if (element) return element
  throw Error(
    `Please double check your class names, there is no ${selector} class`
  )
}

const links = getElement('.nav-links')
const navBtnDOM = getElement('.nav-btn')

navBtnDOM.addEventListener('click', () => {
  links.classList.toggle('show-links')
})

const date = getElement('#date')
const currentYear = new Date().getFullYear()
date.textContent = currentYear

// Get the query parameters from the URL
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');
const country = urlParams.get('country');
// Function to calculate the average rating
function calculateAverageRating(comments) {
  const totalRatings = comments.reduce((total, comment) => total + comment.rating, 0);
  return (totalRatings / comments.length).toFixed(1);
}

// Filter the recipes based on the category or country
const filteredRecipes = recipesDB.filter(recipe => {
  if (category) {
    return recipe.category === category;
  } else if (country) {
    return recipe.country === country;
  }
});

// Get the #recipes-container element
const recipesContainer = document.getElementById("recipes-container");

if (recipesContainer) {
  // Clear the existing list
  recipesContainer.innerHTML = "";

  filteredRecipes.forEach((recipe) => {
    // Create a div element for the recipe card
    const recipeElement = document.createElement("div");
    recipeElement.className = "recipe";

    // Add click event listener to the recipe card
    recipeElement.addEventListener("click", (event) => {
      if (!event.target.closest(".heart-icon")) {
        window.location.href = `single-recipe-details.html?id=${recipe.id}`;
      }
    });
    // Create an img element
    const recipeImage = document.createElement("img");
    recipeImage.src =  `./assets/recipes/${recipe.id}.jpeg`;
    recipeImage.className = "img recipe-img";
    recipeImage.alt = recipe.name;

    // Create an h5 element for the recipe name
    const recipeName = document.createElement("h5");
    recipeName.textContent = recipe.name;

    // Create a p element for prep and cook time
    const recipeTime = document.createElement("p");
    const totalTime = parseInt(recipe.prepTime) + parseInt(recipe.cookTime);
    recipeTime.textContent = `Time: ${totalTime} min`;

    // Create a p element for category and country
    const recipeDetails = document.createElement("p");
    recipeDetails.innerHTML = `${recipe.category} | ${recipe.country}`;

    // Create a p element for the average user rating
    const recipeRating = document.createElement("p");
    const averageRating = calculateAverageRating(recipe.comments);
    recipeRating.innerHTML = "Rating: ";

    // Loop to display 5 stars
    for (let i = 1; i <= 5; i++) {
      // Create an i element for the star
      const starIcon = document.createElement("i");
      starIcon.className = "fas fa-star";

      // Add the star to the p element
      recipeRating.appendChild(starIcon);

      // Check if the star should be yellow or gray
      if (i <= averageRating) {
        starIcon.style.color = "#e2e0ff";
      } else {
        starIcon.style.color = "gray";
      }
    }

    // Create a div element for the heart icon
    const heartIcon = document.createElement("div");
    heartIcon.className = "heart-icon";

    const favoriteRecipes = loadFavoriteRecipes();
    const isFavorite = favoriteRecipes.includes(recipe.id);
    heartIcon.innerHTML = `<i class="${isFavorite ? "fas" : "far"} fa-heart"></i>`; // Use 'fas' class for filled heart if it's a favorite

    // Add click event listener to the heart icon
    heartIcon.addEventListener("click", (event) => {
      onHeartIconClick(recipe, heartIcon);
    });


    // Append child elements to the anchor element
    recipeElement.appendChild(recipeImage);
    recipeElement.appendChild(recipeName);
    recipeElement.appendChild(recipeDetails);
    recipeElement.appendChild(recipeTime);
    recipeElement.appendChild(recipeRating);
    recipeElement.appendChild(heartIcon);

    // Append the anchor element to the container
    recipesContainer.appendChild(recipeElement);
  });
}


// Function to load favorite recipes from Local Storage
function loadFavoriteRecipes() {
  const storedFavorites = localStorage.getItem("favoriteRecipes");
  if (storedFavorites) {
    return JSON.parse(storedFavorites);
  } else {
    return [];
  }
}

function onHeartIconClick(recipe, heartIcon) {
  const favoriteRecipes = loadFavoriteRecipes();
  const isFavorite = favoriteRecipes.includes(recipe.id);

  if (isFavorite) {
    // Remove the recipe from the favorite list and update the heart icon style
    favoriteRecipes.splice(favoriteRecipes.indexOf(recipe.id), 1);
    heartIcon.querySelector("i").classList.remove("fas");
    heartIcon.querySelector("i").classList.add("far");
    heartIcon.classList.remove("favorite-heart"); // Remove the favorite-heart class
  } else {
    // Add the recipe to the favorite list and update the heart icon style
    favoriteRecipes.push(recipe.id);
    heartIcon.querySelector("i").classList.remove("far");
    heartIcon.querySelector("i").classList.add("fas");
    heartIcon.classList.add("favorite-heart"); // Add the favorite-heart class
  }

  // Save the updated favorite recipes to Local Storage
  localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
}


