// API 1: "https://gist.github.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4.js"
// API 2: "https://jsonplaceholder.typicode.com/posts?userId=:id"


// 1. Global Selectors & Data Storage
const filmListEl = document.querySelector(".Film-list");
let filmsData = []; 

// 2. Fetch and Initialize Application
async function initApp() {
  try {
    const response = await fetch("https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/075b6aaba5ee43554ecd55006e5d080a8acf08fe/Film.JSON");
    filmsData = await response.json();
    renderFilms(); // Render initial list once data arrives
  } catch (error) {
    console.error("Error loading films:", error);
    filmListEl.innerHTML = "<p>Failed to load films.</p>";
  }
}

// 3. Centralized Render Function (Handles Sorting & UI Generation)
function renderFilms(sortBy) {
  // Show loading spinner if data hasn't arrived yet
  if (filmsData.length === 0) {
    filmListEl.innerHTML = '<i class="fas fa-spinner Films__loading--spinner"></i>';
    return;
  }

  // Clone data array to avoid mutating the original global list
  let sortedFilms = [...filmsData];

  // Apply sorting algorithms
  if (sortBy === 'a_to_z') {
    sortedFilms.sort((a, b) => a.Title.localeCompare(b.Title));
  } else if (sortBy === 'z_to_a') {
    sortedFilms.sort((a, b) => b.Title.localeCompare(a.Title));
  }
    else if (sortBy === 'Newest_To_Oldest') {
    sortedFilms.sort((a, b) => new Date(b.Released) - new Date(a.Released));
  }
    else if (sortBy === 'Oldest_To_Newest') {
    sortedFilms.sort((a, b) => new Date(a.Released) - new Date(b.Released));
}

  // Generate HTML combining the best elements of your original layouts
  filmListEl.innerHTML = sortedFilms.map((film) => {
    // Escape single/double quotes in title to prevent breaking the HTML attribute string
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
function filterFilms(event) {
  renderFilms(event.target.value);
}

function showFilmPosts(filmTitle) {
  // Find the exact film object by title to save it
  const selectedFilm = filmsData.find(f => f.Title === filmTitle);
  if (selectedFilm) {
    localStorage.setItem("Film", JSON.stringify(selectedFilm));
    window.location.href = `${window.location.origin}/Film.html`;
  }
}

function openMenu() { document.body.classList.add("menu--open"); }
function closeMenu() { document.body.classList.remove("menu--open"); }

// 5. Start App on Page Load
document.addEventListener("DOMContentLoaded", initApp);


//
//setTimeout(() => {
//    renderFilms(); // Initial render without any filter
//
//
//
//
//    
//
const btn = document.querySelector('button');

btn.addEventListener('click', () => {
    btn.style.backgroundColor = 'white'; // Change to your desired color
}, { once: true }); 

document.getElementById('sortOptions').addEventListener('change', (event) => {
    const sortBy = event.target.value;
    renderFilms(sortBy);
});

// other:

document.getElementById("searchBtn").addEventListener("click", function() {
this.classList.toggle("clicked"); // Toggle the clicked clas// Change the icons
let icon1 = document.getElementById("icon1");
let icon2 = document.getElementById("icon2");//
if (icon1.style.display === "inline") {
  icon1.style.display = "inline"; // Show the first icon
  icon2.style.display = "none";   // Hide the second icon//
} else {
  icon1.style.display = "none";   // Hide the first icon
  icon2.style.display = "";  // Show the second icon
  icon2.classList.add("icon-spin"); // Add the spin animation when shown
}
});

 const button = document.getElementById('searchBtn');
 const target = document.getElementById('rolling-images');
 
 button.addEventListener('click', () => {
   target.classList.toggle('animate-now');
 });

