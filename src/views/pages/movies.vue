<template>
  <h2 class="title">Список фильмов из Кинопоиска</h2>
  <Button
    label="Добавить новый фильм"
    @click="$router.push({ name: MOVIE_ID, params: { id: generateId } })"
    class="button"
  />
  <div class="list">
    <div class="movies">
      <Movie
        :movie="movie"
        v-for="movie in pagination(movies)"
        :key="movie.name"
      />
    </div>
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
import Button from "primevue/button";
import { MOVIE_ID } from "@/router/routes.json";

const store = useMovieStore();
const isLocalMoviews = ref<Array<docsI>>();

const movies = computed(() => store.movies);
const first = ref<number>(0);
const rows = ref<number>(10);
const maxMovies = ref<number | undefined>(movies.value?.length);

const pagination = (movies: Array<docsI> | undefined) => {
  const start = first.value,
    end = start + rows.value;
  return movies?.slice(start, end);
};

const max = ref(
  movies.value?.reduce((acc, curr) => (acc?.id > curr?.id ? acc : curr))
);
const generateId = max.value
  ? max.value?.id + 1
  : Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;

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
.title, .button {
  display: block;
  margin: 20px auto;
  text-align: center;
}
.movies {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
}
.list {
  display: flex;
  flex-direction: column;
}
.p-card {
  text-align: center;
}

.p-card-header {
  width: 250px;
  margin: 0 auto;
}
</style>
