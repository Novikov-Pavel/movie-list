<template>
  <h2 class="title">Список фильмов из Кинопоиска</h2>
  <div class="movies">
    <Movie
      v-model:first="first"
      :movie="movie"
      v-for="movie in movies"
      :key="movie.name"
    />
    <Paginator :rows="10" :totalRecords="maxMovies" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Movie from "@/views/components/movie.vue";
import { fetchData, docsI } from "@/API/auth";
import { useMovieStore } from "@/store/movieStore";

const store = useMovieStore();
const isLocalMoviews = ref<Array<docsI>>();

store.setMovies(isLocalMoviews.value || []);

const movies = ref(store.movies);
const first = ref<number>(1);
const maxMovies = ref<number>(250);

onMounted(async () => {
  if (!isLocalMoviews.value) {
    const res = await fetchData(String(first.value), String(maxMovies.value));
    localStorage.setItem("movies", JSON.stringify(res));
  } else
    isLocalMoviews.value = JSON.parse(localStorage.getItem("movies") || "");
});
</script>

<style lang="scss">
.title {
  text-align: center;
  margin-bottom: 20px;
}
.movies {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}
.p-card {
  text-align: center;
}

.p-card-header {
  width: 250px;
  margin: 0 auto;
}
</style>
