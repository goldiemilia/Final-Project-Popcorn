// Keep your menu functions intact at the top
function openMenu() { document.body.classList.add("menu--open"); }
function closeMenu() { document.body.classList.remove("menu--open"); }

// 1. Grab all required DOM elements cleanly
const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput'); 
const target = document.getElementById('rolling-images');
const icon1 = document.getElementById("icon1");
const icon2 = document.getElementById("icon2");

// Global flag to track if a search sequence is currently running
let isSearching = false;

// 2. Build the main execution sequence
function runSearchSequence() {
  // If already animating, block additional triggers safely without breaking the listener
  if (isSearching) return;
  isSearching = true;

  const searchTerm = searchInput ? searchInput.value.trim() : "";

  // A. Trigger all visual effects immediately
  if (searchButton) {
    searchButton.classList.add("clicked");
  }
  
  if (target) {
    target.classList.add('animate-now');
  }

  // B. Swap icons safely without relying on unstable inline style checks
  if (icon1 && icon2) {
    icon1.style.display = "none";         // Hide magnifying glass
    icon2.style.display = "inline-block"; // Show spinner
    icon2.classList.add("icon-spin");     // Start spinning
  }

  // C. Freeze everything for 3 seconds to let animations finish, then execute redirect
  setTimeout(() => {
    if (searchTerm) {
      window.location.href = `movies.html?search=${encodeURIComponent(searchTerm)}`;
    } else {
      window.location.href = 'movies.html';
    }
  }, 3000); // Change 3000 to match the exact runtime duration of your rolling images
}

// 3. Attach unified action event listeners
if (searchButton) {
  // REMOVED { once: true } so the button never breaks or permanently deactivates
  searchButton.addEventListener('click', runSearchSequence);
}

if (searchInput) {
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      // FIXED: Stops the browser from refreshing the page on Enter key press
      event.preventDefault(); 
      runSearchSequence();
    }
  });
}
