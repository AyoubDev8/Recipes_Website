
// Select HTML elements
const RecipesList = document.querySelector(".recipes-list");


// Function to calculate the average rating
function calculateAverageRating(comments) {
  const totalRatings = comments.reduce((total, comment) => total + comment.rating, 0);
  return (totalRatings / comments.length).toFixed(1);
}

// Function to create and add recipe elements
function displayRecipes(filteredRecipes) {
  // Clear the existing list
  RecipesList.innerHTML = "";

  filteredRecipes.forEach((recipe) => {
    // Create a div element for the recipe card
    const recipeElement = document.createElement("div");
    recipeElement.className = "recipe";
    recipeElement.style.maxHeight = "16rem";

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

    // Create an element 'h5' for the recipe name
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


    // Create an element 'p' for the category and country
    const recipeDetails = document.createElement("p");
    recipeDetails.innerHTML = ` ${recipe.category} | ${recipe.country}`;

    // Create an element 'p' for the average user rating
    const recipeRating = document.createElement("p");
    const averageRating = calculateAverageRating(recipe.comments);
    recipeRating.innerHTML = "Rating: ";

    // Create a loop to display 5 stars
    for (let i = 1; i <= 5; i++) {
      // Create an element 'i' for the star
      const starIcon = document.createElement("i");
      starIcon.className = "fas fa-star";

      // Add the star to the 'p' element
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
      event.stopPropagation(); // Stop the event from propagating to the parent recipe element
      onHeartIconClick(recipe, heartIcon);
    });

    // Add child elements to the 'recipeElement'
    recipeElement.appendChild(recipeImage);
    recipeElement.appendChild(recipeName);
    recipeElement.appendChild(recipeDetails);
    recipeElement.appendChild(recipeTime);
    recipeElement.appendChild(recipeRating);
    recipeElement.appendChild(heartIcon);

    // Add the 'recipeElement' to the list of recipes
    RecipesList.appendChild(recipeElement);

  });
}

// Call the function to display the recipes
displayRecipes(recipesDB);


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





const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

let previousSearchTerm = '';

function searchRecipes() {
  const searchTerm = searchInput.value.trim().toLowerCase();


  // If search term is blank or the same as the previous search term, do nothing
  if (searchTerm === previousSearchTerm) {
    return;
  }

  if (searchTerm === "") {
    previousSearchTerm = searchTerm;
    // Reset RecipesList styles
    RecipesList.style.width = "";
    RecipesList.style.marginLeft = ""
    RecipesList.style.display = "";
    RecipesList.style.alignItems = "";
    RecipesList.style.justifyContent = "";
    // Empty search term - display all recipes
    displayRecipes(recipesDB);
  } else {
    // Filter the recipes based on the search term
    const filteredRecipes = recipesDB.filter(
      (recipe) => recipe.name.toLowerCase().includes(searchTerm)
    );
    // Clear the existing list
    RecipesList.innerHTML = "";
    // Update previous search term
    previousSearchTerm = searchTerm;

    // Check if there are any results
    if (filteredRecipes.length === 0) {
      // Create a card element
      const card = document.createElement("div");
      card.style.display = "flex";
      card.style.flexDirection = "column";
      card.style.alignItems = "center";
      card.style.justifyContent = "center";
      card.style.padding = "1rem";
      card.style.border = "1px solid #ccc";
      card.style.borderRadius = "8px";
      card.style.margin = "2rem auto";
      card.style.width = "80%";

      // Create the "No recipes found!" title
      const title = document.createElement("h1");
      title.textContent = "No recipes found!";
      card.appendChild(title);

      // Create the joke paragraph
      const joke = document.createElement("p");
      joke.textContent = "The chef must be busy debugging his cooking code. Try another search!";
      joke.style.textAlign = "center";
      joke.style.marginBottom = "2rem";
      card.appendChild(joke);

      // Display an image of an angry chef
      const angryChefImage = document.createElement("img");
      angryChefImage.src = "./assets/Pictures/Gordon-Ramsay.jpeg"; // Replace with the actual image URL
      angryChefImage.alt = "Angry chef";
      angryChefImage.style.width = "100%"; // Set the image width, adjust as needed
      angryChefImage.style.height = "auto"; // Maintain aspect ratio
      angryChefImage.style.borderRadius = "5px";
      card.appendChild(angryChefImage);
      
      RecipesList.appendChild(card);

       // Update RecipesList styles to center the card
      RecipesList.style.width = "80%";
      RecipesList.style.marginLeft = "8%"
      RecipesList.style.display = "flex";
      RecipesList.style.alignItems = "center";
      RecipesList.style.justifyContent = "center";
      // Scroll to the card after the angry chef image has been loaded
      angryChefImage.addEventListener("load", function () {
        card.scrollIntoView({ behavior: "smooth" });
      });
      // Remove focus from search input
      searchInput.blur();

    } else {
      // Reset RecipesList styles
      RecipesList.style.width = "";
      RecipesList.style.marginLeft = ""
      RecipesList.style.display = "";
      RecipesList.style.alignItems = "";
      RecipesList.style.justifyContent = "";

      // Display the filtered recipes
      displayRecipes(filteredRecipes);
      // Scroll down a little bit (e.g., 100 pixels)
      window.scrollBy({ top: 150, behavior: "smooth" });  
    }
  }
}
// Debounce function
function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounce time in milliseconds
const debounceTime = 500; // Adjust the time based on your preference

// Update the search input event listener
searchInput.addEventListener("input", debounce(function (event) {
  if (event.key === "Enter") {
    searchRecipes();
  } else {
    searchRecipes();
  }
}, debounceTime));

// Add event listeners
searchBtn.addEventListener("click", function () {
  searchRecipes();
});

// Call displayRecipes function initially with all recipes
displayRecipes(recipesDB);

