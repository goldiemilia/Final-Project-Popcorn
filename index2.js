// API 1: "https://gist.github.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4.js"
// API 2: "https://jsonplaceholder.typicode.com/posts?userId=:id"

const FilmListEl = document.querySelector(".Film-list");

async function main () {
    const Films = await fetch("https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/075b6aaba5ee43554ecd55006e5d080a8acf08fe/Film.JSON")
    const FilmsData = await Films.json();
    FilmListEl.innerHTML = FilmsData.map((Film) => FilmHTML(Film)).join("");
}

main ();

function showFilmPosts(id) {
    localStorage.setItem("id", id);
    window.location.href = `${window.location.origin}/Film.html`
}








function FilmHTML(Film) {
    const poster = Film.Poster.replace('SX300', 'SX2000');

    return `<div class="Film-card" onclick="showFilmPosts(${Film.Title})">
        <div class="Film-card__container">
          <h3>${Film.Title}</h3>
            <p><b>Genre:</b> ${Film.Genre}</p>
            <p><b>IMDb Rating:</b> ${Film.imdbRating}</p>
            <img src="${Film.Images}" alt="Poster for ${Film.Title} Poster">
        </div>
    </div>`;
}






// script.js
fetch('https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/075b6aaba5ee43554ecd55006e5d080a8acf08fe/Film.JSON') // Replace with your actual API URL
    .then(response => response.json())
    .then(data => {
        // Assuming the API response has a "Poster" key
        const imageUrl = data.Poster; // Extract the URL from the poster key
        document.getElementById('dynamicImage').src = imageUrl; // Set the image src
    })
    .catch(error => {
        console.error('Error fetching the image:', error);
    });







function openMenu() {
    document.body.classList.add("menu--open");
}

function closeMenu() {
    document.body.classList.remove("menu--open");
}





const btn = document.querySelector('button');

btn.addEventListener('click', () => {
    btn.style.backgroundColor = 'white'; // Change to your desired color
}, { once: true }); 

document.getElementById("searchBtn").addEventListener("click", function() {
  this.classList.toggle("clicked"); // Toggle the clicked class

  // Change the icons
  let icon1 = document.getElementById("icon1");
  let icon2 = document.getElementById("icon2");

  if (icon1.style.display === "inline") {
    icon1.style.display = "inline"; // Show the first icon
    icon2.style.display = "none";   // Hide the second icon

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




//copied from ecommerce//



let Films;

async function renderFilms(filter) {
    const FilmsWrapper = document.querySelector(".Film-list");
    
    // Show loading indicator
    FilmsWrapper.innerHTML = '<i class="fas fa-spinner Films__loading--spinner"></i>';

    // Fetch films if not already fetched
    if (!Films) {
        Films = await getFilms();
    }

    // Sorting logic
    if (filter === 'a_to_z') {
        Films.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (filter === 'z_to_a') {
        Films.sort((a, b) => b.Title.localeCompare(a.Title));
    } else if (filter === 'rating') {
        Films.sort((a, b) => b.imdbRating - a.imdbRating);
    }

    // Create HTML for each film
    const FilmsHtml = Films.map((Film) => {
        return `
        <div class="Film">
            <img src="${Film.Poster}" alt="${Film.Title} Poster" class="Film-image">
            <div class="Film__title">${Film.Title}</div>
            <div class="Film__ratings">${ratingsHTML(Film.imdbRating)}</div>
            <div class="Film__year">${Film.Year}</div>
        </div>`;
    }).join("");

    // Insert the films into the wrapper
    FilmsWrapper.innerHTML = FilmsHtml;
}
