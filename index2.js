// API 1: "https://gist.github.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4.js"
// API 2: "https://jsonplaceholder.typicode.com/posts?userId=:id"

// 1. Global Selectors & Data Storage
const filmListEl = document.querySelector(".Film-list");
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchBtn');
const target = document.getElementById('rolling-images');
const icon1 = document.getElementById("icon1");
const icon2 = document.getElementById("icon2");

let filmsData = [];
let currentSortBy = ""; // Track the active sort method globally

// 2. Fetch and Initialize Application
async function initApp() {
  try {
    const response = await fetch("https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/075b6aaba5ee43554ecd55006e5d080a8acf08fe/Film.JSON");
    filmsData = await response.json();
    
    // Check URL parameters first so we grab any homepage search term
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    
    if (searchParam) {
      if (searchInput) searchInput.value = decodeURIComponent(searchParam);
    }

    // Render films (it will automatically look at the search input value)
    renderFilms();

  } catch (error) {
    console.error("Error loading films:", error);
    filmListEl.innerHTML = "<p>Failed to load films.</p>";
  }
}

// 3. Centralized Render Function (Handles Combined Filtering & Sorting)
function renderFilms(sortBy) {
  // If a new sort is passed, remember it. Otherwise, use the last known sort method.
  if (sortBy !== undefined) {
    currentSortBy = sortBy;
  }

  // Show loading spinner if data hasn't arrived yet
  if (filmsData.length === 0) {
    filmListEl.innerHTML = '<i class="fas fa-spinner Films__loading--spinner"></i>';
    return;
  }

  // A. FIRST STEP: FILTER THE DATA
  // Get the current search term directly from your search bar
  const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
  
  let displayedFilms = filmsData.filter(film => {
    const title = film.Title ? film.Title.toLowerCase() : "";
    const genre = film.Genre ? film.Genre.toLowerCase() : "";
    // Match against both title or genre keywords
    return title.includes(searchTerm) || genre.includes(searchTerm);
  });

  // B. SECOND STEP: SORT THE FILTERED SUBSET
  if (currentSortBy === 'a_to_z') {
    displayedFilms.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (currentSortBy === 'z_to_a') {
    displayedFilms.sort((a, b) => b.Title.localeCompare(a.Title));
  } else if (currentSortBy === 'Newest_To_Oldest') {
    displayedFilms.sort((a, b) => new Date(b.Released) - new Date(a.Released));
  } else if (currentSortBy === 'Oldest_To_Newest') {
    displayedFilms.sort((a, b) => new Date(a.Released) - new Date(b.Released));
  }

  // Handle empty search results cleanly
  if (displayedFilms.length === 0) {
    filmListEl.innerHTML = '<p class="Films__no-results">No movies match your search query.</p>';
    return;
  }

  // C. THIRD STEP: GENERATE HTML FOR JUST THE FILTERED/SORTED ITEMS
  filmListEl.innerHTML = displayedFilms.map((film) => {
    const escapedTitle = film.Title.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    return `
      <div class="Film-card" onclick="showFilmPosts('${escapedTitle}')">
        <div class="Film-card__container">
          <h3>${film.Title}</h3>
          <p><b>Genre:</b> ${film.Genre}</p>
          <p><b>IMDb Rating:</b> ${film.imdbRating || film.Rating || 'N/A'}</p>
          <p><b>Year:</b> ${film.Year || (film.Released ? new Date(film.Released).getFullYear() : 'N/A')}</p>
          <img src="${film.Images?.[0] || film.Poster || ''}" alt="Poster for ${film.Title}">
        </div>
      </div>
    `;
  }).join("");
}

// 4. Interaction Events & Routing Helpers
function showFilmPosts(filmTitle) {
  const selectedFilm = filmsData.find(f => f.Title === filmTitle);
  if (selectedFilm) {
    localStorage.setItem("Film", JSON.stringify(selectedFilm));
    window.location.href = `${window.location.origin}/Film.html`;
  }
}

function openMenu() { document.body.classList.add("menu--open"); }
function closeMenu() { document.body.classList.remove("menu--open"); }

// 5. Search Filtering & Icon UI Engine
function triggerSearchAction() {
  // Re-run the core render engine. It handles filtering and sorting concurrently!
  renderFilms();
  
  // Instantly turn off the loading animation state
  resetSearchButtonUI();
}

function startSearchButtonUI() {
  if (searchButton) searchButton.classList.add("clicked");
  if (target) target.classList.add('animate-now');
  if (icon1 && icon2) {
    icon1.style.display = "none";
    icon2.style.display = "inline-block";
    icon2.classList.add("icon-spin");
  }
}

function resetSearchButtonUI() {
  if (icon1 && icon2) {
    icon1.style.display = "inline";
    icon2.style.display = "none";
    icon2.classList.remove("icon-spin");
  }
}

// 6. Attach Listeners and Start App on Page Load
document.addEventListener("DOMContentLoaded", initApp);

if (document.getElementById('sortOptions')) {
  document.getElementById('sortOptions').addEventListener('change', (event) => {
    // Passes the dropdown value to sort only the active subset
    renderFilms(event.target.value); 
  });
}

if (searchButton) {
  searchButton.addEventListener('click', () => {
    startSearchButtonUI();
    setTimeout(() => {
      triggerSearchAction();
    }, 300);
  });
}

if (searchInput) {
  searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      startSearchButtonUI();
      setTimeout(() => {
        triggerSearchAction();
      }, 300);
    }
  });
}
