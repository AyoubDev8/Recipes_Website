// Sélectionner les éléments HTML

const recipePageDiv = document.querySelector('.recipes-page');
const categoriesList = document.querySelector(".categories-list");
const countriesList = document.querySelector(".countries-list");
const recipesList = document.querySelector(".recipes-list");


// CATEGORIESSSSSS 

if (categoriesList) {

  // Count the number of recipes in each category
  const categoriesCount = recipesDB.reduce((counts, recipe) => {
    if (!counts[recipe.category]) {
      counts[recipe.category] = 0;
    }
    counts[recipe.category]++;
    return counts;
  }, {});
  
  // Clear the existing list
  categoriesList.innerHTML = "";
  
  // Generate category links
  for (const category in categoriesCount) {
    const encodedCategory = encodeURIComponent(category);
    const categoryLink = document.createElement("a");
    categoryLink.href = `template.html?category=${encodedCategory}`;
    categoryLink.textContent = `${category} (${categoriesCount[category]})`;
  
    // Append the link to the .categories-list element
    categoriesList.appendChild(categoryLink);
  }
}

//COUNTRIESSSSS 

if (countriesList) {
  // Count the number of recipes in each country
  const countriesCount = recipesDB.reduce((counts, recipe) => {
    if (!counts[recipe.country]) {
      counts[recipe.country] = 0;
    }
    counts[recipe.country]++;
    return counts;
  }, {});

  // Clear the existing list
  countriesList.innerHTML = "";

  // Generate country links
  for (const country in countriesCount) {
    const encodedCountry = encodeURIComponent(country);
    const countryLink = document.createElement("a");
    countryLink.href = `template.html?country=${encodedCountry}`;
    countryLink.textContent = `${country} (${countriesCount[country]})`;

    // Append the link to the .countries-list element
    countriesList.appendChild(countryLink);
  }
}


// Function to calculate the average rating
function calculateAverageRating(comments) {
  const totalRatings = comments.reduce((total, comment) => total + comment.rating, 0);
  return (totalRatings / comments.length).toFixed(1);
}


// Fonction pour créer et ajouter les éléments de recette
function displayRandomRecipes() {
  const randomIndices = new Set();

  // Générer 3 indices aléatoires uniques
  while (randomIndices.size < 6) {
    const randomIndex = Math.floor(Math.random() * recipesDB.length);
    randomIndices.add(randomIndex);
  }

  // Afficher les recettes correspondant aux indices aléatoires
  randomIndices.forEach((index) => {
    const recipe = recipesDB[index];

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
    recipesList.appendChild(recipeElement);
  });
}

// Appeler la fonction pour afficher les recettes aléatoires
// Check the current page path
// Only call the displayRandomRecipes function if we are not on the recipe page
if (!recipePageDiv) {
  displayRandomRecipes();
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


// CONTACT FORM

const contactForm = document.getElementById("contact-form");

function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function saveContactToLocalStorage(name, email, message) {
  const savedContacts = JSON.parse(localStorage.getItem("contactMessages")) || [];
  savedContacts.push({ name, email, message });
  localStorage.setItem("contactMessages", JSON.stringify(savedContacts));
}

function handleContactFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    showModal("Missing fields", "Please fill in all the fields.");
  } else if (!isEmailValid(email)) {
    showModal("Invalid email", "Please enter a valid email address.");
  } else {
    saveContactToLocalStorage(name, email, message);
    showModal("Thank you!", "Your message has been sent. We will get back to you soon.");
    contactForm.reset();
  }
}

contactForm.addEventListener("submit", handleContactFormSubmit);