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
const navSearchInput = document.getElementById("nav-search-input");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const footerForm = document.querySelector(".footer-form");
const footerEmailInput = document.querySelector(".footer-email");
const signUpBtn = document.querySelector(".sign-up-btn");

const newModal = document.getElementById("newsletter-modal");
const newCloseModal = document.querySelector(".close-newsletter-modal");
const modalTitle = document.getElementById("newsletter-modal-title");
const modalMessage = document.getElementById("newsletter-modal-message");


navSearchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    navSearchRecipe();
  }
});

closeModal.addEventListener("click", function () {
  modal.classList.add("hidden");
});

function navSearchRecipe() {
  const searchTerm = navSearchInput.value.trim().toLowerCase();

  // Filter the recipes based on the search term
  const filteredRecipes = recipesDB.filter(
    (recipe) => recipe.name.toLowerCase() === searchTerm
  );

  if (searchTerm === "") {
    // Empty search term - display all recipes
    displayRecipes(recipesDB);
  } else if (filteredRecipes.length === 0) {
    // No matching recipes found - display the modal
    modal.classList.remove("hidden");
  } else {
    // Redirect to details page of first matching recipe
    const firstMatch = filteredRecipes[0];
    window.location.href = `single-recipe-details.html?id=${firstMatch.id}`;
  }
}




function showModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  newModal.style.display = "block";
}

function hideModal() {
  newModal.style.display = "none";
}

function isEmailValid(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function saveEmailToLocalStorage(email) {
  const savedEmails = JSON.parse(localStorage.getItem("newsletterEmails")) || [];
  if (!savedEmails.includes(email)) {
    savedEmails.push(email);
    localStorage.setItem("newsletterEmails", JSON.stringify(savedEmails));
    return true;
  }
  return false;
}

function handleNewsletterSignUp(event) {
  event.preventDefault();

  const email = footerEmailInput.value.trim();

  if (!isEmailValid(email)) {
    showModal("Invalid email", "Please enter a valid email address.");
  } else if (saveEmailToLocalStorage(email)) {
    showModal("Thank you!", "You have successfully signed up for our weekly newsletter.");
  } else {
    showModal("Already signed up", "You are already subscribed to our newsletter. Thank you for your support!");
  }
}

footerForm.addEventListener("submit", handleNewsletterSignUp);
newCloseModal.addEventListener("click", hideModal);

// Close the modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === newModal) {
    hideModal();
  }
});
