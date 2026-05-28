// http://www.omdbapi.com/?apikey=[yourkey]&
// http://img.omdbapi.com/?apikey=[yourkey]&


// document.getElementById("searchBtn").addEventListener("click", function() {
//   this.classList.toggle("clicked"); // Toggle the clicked class
// 
//   // Change the icon
//   let icon = this.querySelector("i");
//   if (icon.classList.contains("fa-solid,fa-magnifying-glass")) {
//     icon.classList.remove("fa-solid,fa-magnifying-glass");
//     icon.classList.add("fa-duotone,fa-solid,fa-spinner"); // Change to a different icon
//   } else {
//     icon.classList.remove("fa-duotone,fa-solid,fa-spinner");
//     icon.classList.add("fa-solid,fa-magnifying-glass"); // Change back to original icon
//   }
// })


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



// document.getElementById("searchBtn").addEventListener("click", function() {
//   this.classList.toggle("clicked"); // Toggle the clicked class
// 
//   // Change the icons
//   let icon1 = document.getElementById("icon1");
//   let icon2 = document.getElementById("icon2");
// 
//   if (icon1.style.visibility === "hidden") {
//     icon1.style.visibility = "visible"; // Show the first icon
//     icon1.style.opacity = "1"; // Make it fully visible
//     icon2.style.visibility = "hidden";   // Hide the second icon
//     icon2.style.opacity = "0"; // Make it fully transparent
//     icon2.classList.remove("icon-spin"); // Ensure spin animation is removed
//     console.log("icon1 is visible, icon2 hidden."); // Log this action
//   } else {
//     icon1.style.visibility = "hidden";   // Hide the first icon
//     icon1.style.opacity = "0"; // Make it fully transparent
//     icon2.style.visibility = "visible";  // Show the second icon
//     icon2.style.opacity = "1"; // Make it fully visible
//     icon2.classList.add("icon-spin"); // Add the spin animation
//   }
// });





// const btn = document.getElementById('searchBtn');
// const icon = document.getElementById('searchIcon');
// 
// btn.addEventListener('click', () => {
//   // Toggle the background color class
//   btn.classList.toggle('active');
//   
//   // Swap the icon class (Magnifying glass <-> X)
//   icon.classList.toggle('fa-solid,fa-magnifying-glass');
//   icon.classList.toggle('fa-duotone,fa-solid,fa-spinner');
// });