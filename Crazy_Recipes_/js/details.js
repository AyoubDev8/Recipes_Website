const createRecipeArticle = (recipe) => {
  const article = document.createElement("article");
  article.classList.add("recipe-info");

  const title = document.createElement("h2");
  title.textContent = recipe.name;
  article.appendChild(title);

  const description = document.createElement("p");
  description.textContent = recipe.description;
  article.appendChild(description);

  const iconsDiv = document.createElement("div");
  iconsDiv.classList.add("recipe-icons");
  article.appendChild(iconsDiv);

  const createIconArticle = (iconClass, title, value) => {
    const iconArticle = document.createElement("article");

    const icon = document.createElement("i");
    icon.className = iconClass;
    iconArticle.appendChild(icon);

    const subtitle = document.createElement("h5");
    subtitle.textContent = title;
    iconArticle.appendChild(subtitle);

    const text = document.createElement("p");
    text.textContent = value;
    iconArticle.appendChild(text);

    return iconArticle;
  };

  iconsDiv.appendChild(createIconArticle("fas fa-clock", "prep time", recipe.prepTime));
  iconsDiv.appendChild(createIconArticle("far fa-clock", "cook time", recipe.cookTime));
  iconsDiv.appendChild(createIconArticle("fas fa-user-friends", "serving", recipe.servings));


  return article;
};

// Get the recipe ID from the URL
const getRecipeID = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get("id"));
};

// Find the recipe by ID in the recipesDB
const findRecipe = (recipesDB, recipeID) => recipesDB.find((r) => r.id === recipeID);

const createCommentElement = (comment) => {
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("comment");

  const userP = document.createElement("p");
  userP.classList.add("comment-user");
  userP.textContent = `${comment.user}:`;

  const ratingP = document.createElement("p");
  ratingP.classList.add("comment-rating");
  ratingP.textContent = "Rating: ";
  const commentStarRating = createStarRating(comment.rating);
  ratingP.appendChild(commentStarRating);


  const contentP = document.createElement("p");
  contentP.classList.add("comment-content");
  contentP.textContent = comment.content;

  commentDiv.appendChild(userP);
  commentDiv.appendChild(ratingP);
  commentDiv.appendChild(contentP);

  return commentDiv;
};

function createStarRating(rating) {
  const ratingElement = document.createElement("span");

  for (let i = 1; i <= 5; i++) {
    const starIcon = document.createElement("i");
    starIcon.className = "fas fa-star";
    ratingElement.appendChild(starIcon);

    if (i <= rating) {
      starIcon.style.color = "#e2e0ff";
    } else {
      starIcon.style.color = "gray";
    }
  }

  return ratingElement;
}


const displayRecipeDetails = (recipe) => {
  // Get the container element where you want to insert the elements
  const container = document.querySelector(".recipe-page");

  // Create a section element with class "recipe-hero"
  const section = document.createElement("section");
  section.classList.add("recipe-hero");

  // Add the image element
  const img = document.createElement("img");
  img.classList.add("img");
  img.classList.add("recipe-hero-img");
  img.src = `./assets/recipes/${recipe.id}.jpeg`;
  img.alt = recipe.name;

  // Add the recipe article element
  const recipeArticle = createRecipeArticle(recipe);

  // Append the image and article elements to the section
  section.appendChild(img);
  section.appendChild(recipeArticle);

  // Create a section element with class "recipe-content"
  const contentSection = document.createElement("section");
  contentSection.classList.add("recipe-content");
  contentSection.style.minHeight = '180vh'; // Adjust this value based on your needs


  // Add the instructions article
  const instructionsArticle = document.createElement("article");
  const instructionsTitle = document.createElement("h4");
  instructionsTitle.textContent = "instructions";
  instructionsArticle.appendChild(instructionsTitle);

  // Dynamically add the instructions using an ordered list
  const instructionsList = document.createElement("ol");
  recipe.instructions.forEach((instruction) => {
    const instructionLi = document.createElement("li");
    instructionLi.textContent = instruction;
    instructionsList.appendChild(instructionLi);
  });
  instructionsArticle.appendChild(instructionsList);

  // Add the ingredients and tools articles in the second column
  const secondColumnArticle = document.createElement("article");
  secondColumnArticle.classList.add("second-column");

  // Add the ingredients div
  const ingredientsDiv = document.createElement("div");
  const ingredientsTitle = document.createElement("h4");
  ingredientsTitle.textContent = "ingredients";
  ingredientsDiv.appendChild(ingredientsTitle);

  // Dynamically add the ingredients using an unordered list
  const ingredientsList = document.createElement("ul");
  recipe.ingredients.forEach((ingredient) => {
    const ingredientLi = document.createElement("li");
    ingredientLi.textContent = ingredient;
    ingredientsList.appendChild(ingredientLi);
  });
  ingredientsDiv.appendChild(ingredientsList);

  // Add the tools div
  const toolsDiv = document.createElement("div");
  const toolsTitle = document.createElement("h4");
  toolsTitle.textContent = "tools";
  toolsDiv.appendChild(toolsTitle);

  // Dynamically add the tools using an unordered list
  const toolsList = document.createElement("ol");
  recipe.tools.forEach((tool) => {
    const toolLi = document.createElement("li");
    toolLi.textContent = tool;
    toolsList.appendChild(toolLi);
  });
  toolsDiv.appendChild(toolsList);

  // Append the ingredients and tools divs to the second column article
  secondColumnArticle.appendChild(ingredientsDiv);
  secondColumnArticle.appendChild(toolsDiv);

  // Append the instructions and second column articles to the content section
  contentSection.appendChild(instructionsArticle);
  contentSection.appendChild(secondColumnArticle);

  // Create a section element with class "recipe-comments"
  const commentsSection = document.createElement("section");
  commentsSection.classList.add("recipe-comments");
  commentsSection.style.marginTop = "-30rem"


  // Add a title for the comments section
  const commentsTitle = document.createElement("h3");
  commentsTitle.textContent = "Comments";
  commentsSection.appendChild(commentsTitle);

  // Dynamically add the comments
  recipe.comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    commentsSection.appendChild(commentElement);
  });

  // Append the comments section to the content section
  contentSection.appendChild(commentsSection);

  // Insert the section elements into the container
  container.appendChild(section);
  container.appendChild(contentSection);
};



// Main
const recipeId = getRecipeID();

if (recipeId) {
  const recipe = findRecipe(recipesDB, recipeId);
  if (recipe) {
    displayRecipeDetails(recipe);
  } else {
    console.error(`Recipe with ID ${recipeId} not found.`);
  }
} else {
  console.error("No recipe ID found in the URL.");
}




