const searchInput = document.getElementById('search-input');
const movieList = document.getElementById('movie-list');
let movies = [];

async function loadMovies() {
    try {
        const response = await fetch('movies.json'); 
        if (!response.ok) {
            throw new Error('Ошибка загрузки данных');
        }
        movies = await response.json(); 
        displayMovies(movies);
    } catch (error) {
        console.error('Ошибка:', error);
        movieList.innerHTML = '<li>Ошибка загрузки фильмов.</li>';
    }
}

function displayMovies(filteredMovies) {
    movieList.innerHTML = ''; 

    if (filteredMovies.length === 0) {
        movieList.innerHTML = '<li>Фильмов не найдено.</li>';
        return;
    }

    filteredMovies.forEach(movie => {
        const li = document.createElement('li');
        li.className = 'movie-item';

        li.innerHTML = `
            <span class="movie-title">${movie.title}</span>
            <span class="movie-genre">${movie.genre}</span>
            <span class="movie-ratings">Рейтинги: ${movie.ratings}</span>
        `;
        movieList.appendChild(li);
    });
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(query)
    );
    displayMovies(filteredMovies);
});

function sortMovies(key) {
    const sortedMovies = [...movies].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
    });

    displayMovies(sortedMovies);
}
loadMovies();
