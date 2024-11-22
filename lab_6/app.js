import { createApp, ref, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    setup() {
        const data = ref([]);
        const newMovie = ref("");
        onMounted(async () => {
            const response = await fetch('movies.json');
            const movies = await response.json();
            data.value = movies.map(movie => ({ title: movie.title, watched: false }));
        });
        
        const addMovie = () => {
            const movieTitle = newMovie.value.trim();
            if (movieTitle) {
                data.value.push({ title: movieTitle, watched: false });
                newMovie.value = ""; 
            } else {
                alert("Введите название фильма!");
            }
        };

        const deleteMovie = (index) => {
            data.value.splice(index, 1);
        };

        const markWatched = (index) => {
            data.value[index].watched = !data.value[index].watched;
        };

        return {
            data,
            newMovie,
            addMovie,
            deleteMovie,
            markWatched
        };
    }
}).mount('#app');
