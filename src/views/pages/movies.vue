<template>
  <h2 class="title">Список фильмов из Кинопоиска</h2>
  <div class="movies">
    <Movie
      :movie="movie"
      v-for="movie in pagination(movies as Array<docsI>)"
      :key="movie.name"
    />
    <Paginator :rows="rows" :totalRecords="250" v-model:first="first" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import Movie from "@/views/components/movie.vue";
import { fetchData, docsI } from "@/API/auth";
import { useMovieStore } from "@/store/movieStore";
import { watchEffect } from "vue";
import Paginator from "primevue/paginator";

const store = useMovieStore();
const isLocalMoviews = ref<Array<docsI>>();

const movies = computed(() => store.movies);
const first = ref<number>(0);
const rows = ref<number>(10);
const maxMovies = ref<number>(movies.value?.length);

const pagination = (movies: Array<docsI>) => {
  const start = first.value,
    end = start + rows.value;
  return movies?.slice(start, end);
};

onMounted(async () => {
  if (!localStorage.getItem("movies")) {
    const res = await fetchData(
      String(first.value + 1),
      String(maxMovies.value)
    );
    localStorage.setItem("movies", JSON.stringify(res));
  } else
    isLocalMoviews.value = JSON.parse(localStorage.getItem("movies") || "");
});

watchEffect(() => {
  store.setMovies(isLocalMoviews.value);
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
