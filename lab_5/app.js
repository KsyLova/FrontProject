import {createApp, ref, computed, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    setup() {
        const data = ref([]);
        const searchQuery = ref("");

        onMounted(async () => {
            const response = await fetch('movies.json'); 
            data.value = await response.json();
        });


        const filteredData = computed(() => {
            return data.value.filter(item =>
                item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        });

        const sortBy = (key) => {
            data.value.sort((a, b) => {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;
            });
        };

        return {
            searchQuery,
            sortBy,
            filteredData
        };
    }
}).mount('#app');
