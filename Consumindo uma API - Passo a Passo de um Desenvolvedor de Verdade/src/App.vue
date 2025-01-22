<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { PopularMovie } from "./types/TheMovieDB/PopularMovie.ts";

const movies = ref<PopularMovie[]>([]);

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

interface PopularMoviesResponse {
  pages: number;
  results: PopularMovie[];
  total_pages: number;
  total_results: number;
}

async function getPopularMovies() {
  const response: PopularMoviesResponse = await fetch("https://api.themoviedb.org/3/movie/popular", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${TMDB_API_KEY}`,
    },
  }).then((response) => response.json());
  movies.value = response.results;
}

onMounted(async () => {
  await getPopularMovies();
});
</script>

<template>
  <main>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.overview }}</p>
      </li>
    </ul>
  </main>
</template>

<style scoped></style>
