const postListEl = document.querySelector('.post-list');
const Title = localStorage.getItem("Title")

async function onSearchChange(event) {
    const Title = event.target.value;
    renderPosts(Title)
}

async function renderPosts(Title) { 
    const posts = await fetch (`https://jsonplaceholder.typicode.com/posts?FilmTitle=${Title}`)
    const postsData = await posts.json();
    FilmListEl.innerHTML = postsData.map(post => postHTML(post)).join('');
}

function postHTML(post) {
    return `
        <div class="post">
            <div class="post__title">
              ${post.title}
            </div>
            <p class="post__body">
              ${post.body}
            </p>
        </div>    
    `
}

renderPosts (id);