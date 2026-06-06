// API 1: "https://gist.github.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4.js"
// API 2: "https://jsonplaceholder.typicode.com/posts?userId=:id"


function openMenu() {
    document.body.classList += " menu--open";
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}


const FilmListEl = document.querySelector(".Film-list");


let FilmsData = []; // Declare FilmsData globally

async function main() {
    const response = await fetch("https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/075b6aaba5ee43554ecd55006e5d080a8acf08fe/Film.JSON");
    FilmsData = await response.json(); // Use 'response' instead of 'Film'
    renderFilms(); // Call renderFilms after fetching data

    FilmListEl.innerHTML = FilmsData.map((Film) => FilmHTML(Film)).join(""); // Use 'FilmsData'
}

main();


function showFilmPosts(Film) {
    localStorage.setItem("Film", JSON.stringify(Film));
    window.location.href = `${window.location.origin}/Film.html`
}


function FilmHTML(Film) {
    return `<div class="Film-card" onclick="showFilmPosts(${Film.Title})">
        <div class="Film-card__container">
          <h3>${Film.Title}</h3>
            <p><b>Genre:</b> ${Film.Genre}</p>
            <p><b>IMDb Rating:</b> ${Film.imdbRating}</p>
            <img src="${Film.Images}" alt="Poster for ${Film.Title} Poster">
        </div>
    </div>`;
}
//
//// script.js
fetch('https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/075b6aaba5ee43554ecd55006e5d080a8acf08fe/Film.JSON') // Replace with your actual API URL
    .then(response => response.json())
    .then(data => {
        // Assuming the API response has a "Poster" key
        const imageUrl = data.Poster; // Extract the URL from the poster key
        document.getElementById('moviePoster').src = imageUrl; // Set the image src
    })
    .catch(error => {
        console.error('Error fetching the image:', error);
    });
//
////
////copied from ecommerce//
//


let Films = renderFilms();
//

async function renderFilms(sortBy) {
    const FilmsWrapper = document.querySelector(".Film-list");

    // Show loading indicator while fetching data
    FilmsWrapper.innerHTML = '<i class="fas fa-spinner Films__loading--spinner"></i>';

    // Fetch films only if not previously fetched
    if (FilmsData.length === 0) { // Check if FilmsData is empty
        await getFilms(); // Fetch films if not already done
    }

    // Create a copy of the FilmsData array to sort
    let sortedFilms = [...FilmsData];

    // Sorting logic based on the selected criteria
    if (sortBy === 'a_to_z') {
        sortedFilms.sort((a, b) => a.Title.localeCompare(b.Title)); // A-Z
    } else if (sortBy === 'z_to_a') {
        sortedFilms.sort((a, b) => b.Title.localeCompare(a.Title)); // Z-A
    }

    // Create HTML for each film
    const FilmsHtml = sortedFilms.map((Film) => {
        return `
        <div class="Film-card">
            <h3>${Film.Title}</h3>
            <p>Rating: ${Film.Rating}</p>
            <p>Release Date: ${Film.ReleaseDate}</p>
        </div>
        `;
    }).join("");

    // Insert the generated HTML into the DOM
    FilmsWrapper.innerHTML = FilmsHtml;
}


// Update the filterFilms function to pass the selected value
function filterFilms(event) {
    renderFilms(event.target.value); // Call renderFilms with the selected value
}

// Call this on page load to render films initially
document.addEventListener("DOMContentLoaded", () => {
    renderFilms(); // This will execute when the DOM is fully loaded
});




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

