// Keep your menu functions intact at the top
function openMenu() { document.body.classList.add("menu--open"); }
function closeMenu() { document.body.classList.remove("menu--open"); }

// 1. Grab all required DOM elements cleanly
const searchButton = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput'); 
const target = document.getElementById('rolling-images');
const icon1 = document.getElementById("icon1");
const icon2 = document.getElementById("icon2");

// Global flag to lock interactions while the cinematic intro plays out
let isSearching = false;

// 2. Build the main execution sequence
function runSearchSequence() {
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

  // B. Swap icons cleanly
  if (icon1 && icon2) {
    icon1.style.display = "none";         // Hide magnifying glass
    icon2.style.display = "inline-block"; // Show spinner
    icon2.classList.add("icon-spin");     // Start spinning
  }

  // C. Wait 3 seconds to let animations finish, then execute redirect
  setTimeout(() => {
    if (searchTerm) {
      window.location.href = `movies.html?search=${encodeURIComponent(searchTerm)}`;
    } else {
      window.location.href = 'movies.html';
    }
  }, 3000); // 3000ms = 3 seconds (Matches your rolling-images timeline)
}

// 3. Attach unified action event listeners
if (searchButton) {
  searchButton.addEventListener('click', (event) => {
    event.preventDefault(); // Defends against unexpected wrapper form loops
    runSearchSequence();
  });
}

if (searchInput) {
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // FIXED: Forcefully stops the enter key from refreshing the homepage!
      runSearchSequence();
    }
  });
}
