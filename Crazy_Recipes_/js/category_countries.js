
const categoryImages = {
    "Breakfast": "./assets/Categories/Breakfast.jpeg",
    "Lunch": "./assets/Categories/Lunch.jpeg",
    "Dinner": "./assets/Categories/Dinner.jpeg",
    "Main Course": "./assets/Categories/Maincourse.jpeg",
    "Appetizer": "./assets/Categories/Appetizer.jpeg",
    "Dish": "./assets/Categories/Dish.jpeg",
    "Main Dish": "./assets/Categories/maindish.jpeg",
    "Dessert": "./assets/Categories/dessert.jpeg",
    "Hot drink": "./assets/Categories/hotdrink.jpeg",
    "Drink": "./assets/Categories/drink.jpeg",
    "Cold drink": "./assets/Categories/colddrink.jpeg",
    "Soup": "./assets/Categories/soup.jpeg",
};


const countryImages = {
  "Egypt": "./assets/Countries/Egypt.jpeg",
  "Jordan": "./assets/Countries/Jordan.jpeg",
  "Lebanon": "./assets/Countries/Lebanon.jpeg",
  "Saudi Arabia": "./assets/Countries/Saudiarabia.jpeg",
  "Palestine": "./assets/Countries/Palestine.jpeg",
  "Algeria": "./assets/Countries/Algeria.jpeg",
  "Morocco": "./assets/Countries/Morocco.jpeg",
  "Turkey": "./assets/Countries/Turkey.jpeg",
  "Japan" : "./assets/Countries/Japan.jpeg",
  "Thailand" : "./assets/Countries/Thailand.webp",
  "Mexico" : "./assets/Countries/Mexico.webp",
  "France" : "./assets/Countries/France.jpeg",
  "United States" : "./assets/Countries/usa.jpeg",
  "Spain" : "./assets/Countries/spain.jpeg",
  "Italy" : "./assets/Countries/italy.jpeg",
  "Vietnam" : "./assets/Countries/vietnam.jpeg",
  "South Korea" : "./assets/Countries/southkorea.jpeg",
  "India" : "./assets/Countries/india.jpeg",
  "Greece" : "./assets/Countries/greece.jpeg",
  "Brazil" : "./assets/Countries/brazil.jpeg",
  
};
  

const categoriesContainer = document.getElementById("categories-container");
const countriesContainer = document.getElementById("countries-container");

if (categoriesContainer) {
  // Count the number of recipes in each category
  const categoriesCount = recipesDB.reduce((counts, recipe) => {
    if (!counts[recipe.category]) {
      counts[recipe.category] = 0;
    }
    counts[recipe.category]++;
    return counts;
  }, {});
  

  // Clear the existing list
  categoriesContainer.innerHTML = "";

  // Generate category links
  for (const category in categoriesCount) {
    const encodedCategory = encodeURIComponent(category);

    const categoryCard = document.createElement("div");
    categoryCard.classList.add("category-card");

    const categoryLink = document.createElement("a");
    categoryLink.href = `template.html?category=${encodedCategory}`;


    const categoryImage = document.createElement("img");
    categoryImage.src = categoryImages[category]; // Get the image URL or path from the categoryImages object
    categoryImage.alt = `${category} image`;
    categoryImage.classList.add("category-image");

    const categoryInfo = document.createElement("div");
    categoryInfo.classList.add("category-info");
    categoryInfo.innerHTML = `
      <h5>${category}</h5>
      <p>${categoriesCount[category]} recipe${categoriesCount[category] > 1 ? "s" : ""}</p>
    `;

    categoryLink.appendChild(categoryImage);
    categoryLink.appendChild(categoryInfo);
    categoryCard.appendChild(categoryLink);
    categoriesContainer.appendChild(categoryCard);
  }
}
  

if (countriesContainer) {
  // Count the number of recipes in each country
  const countriesCount = recipesDB.reduce((counts, recipe) => {
    if (!counts[recipe.country]) {
      counts[recipe.country] = 0;
    }
    counts[recipe.country]++;
    return counts;
  }, {});

  // Clear the existing list
  countriesContainer.innerHTML = "";

  // Generate country links
  for (const country in countriesCount) {
    const encodedCountry = encodeURIComponent(country);

    const countryCard = document.createElement("div");
    countryCard.classList.add("country-card");

    const countryLink = document.createElement("a");
    countryLink.href = `template.html?country=${encodedCountry}`;


    const countryImage = document.createElement("img");
    countryImage.src = countryImages[country]; // Get the image URL or path from the countryImages object
    countryImage.alt = `${country} image`;
    countryImage.classList.add("country-image");

    const countryInfo = document.createElement("div");
    countryInfo.classList.add("country-info");
    countryInfo.innerHTML = `
      <h5>${country}</h5>
      <p>${countriesCount[country]} recipe${countriesCount[country] > 1 ? "s" : ""}</p>
    `;

    countryLink.appendChild(countryImage);
    countryLink.appendChild(countryInfo);
    countryCard.appendChild(countryLink);
    countriesContainer.appendChild(countryCard);
  }
}

