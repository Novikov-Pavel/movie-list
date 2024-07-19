import { docsI } from "@/API/auth";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMovieStore = defineStore("movies", () => {
  const movies = ref<Array<docsI>>();

  const setMovies = (newMovies: Array<docsI>) => {
    movies.value = newMovies;
  };

  return { movies, setMovies };
});
