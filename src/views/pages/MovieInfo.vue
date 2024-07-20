<template>
  <div class="container">
    <div class="header">
      <Button
        icon="pi pi-chevron-left"
        aria-label="Назад"
        @click="$router.back()"
      />
      <h2>
        <Inplace closable :disabled="!isEdit" @close="isEdit = false">
          <template #display> {{ name }} {{ year }} </template>
          <template #content>
            <InputText v-model="name" autofocus />
            <InputText v-model="year" autofocus />
          </template>
          <template #closeicon>
            <i class="pi pi-check" />
          </template>
        </Inplace>
      </h2>
    </div>
    <Image
      v-if="movie?.poster?.previewUrl"
      :src="movie?.poster?.previewUrl"
      alt="Лого фильма"
      width="250"
      height="300px"
    />
    <Skeleton v-else width="250px" height="300px" />
    <h3>О фильме</h3>
    <div class="infos">
      <Inplace closable :disabled="!isEdit" @close="isEdit = false">
        <template #display v-if="yearEdit">
          Год производства: {{ yearEdit }}</template
        >
        <template #content>
          <InputText v-model="yearEdit" autofocus />
        </template>
        <template #closeicon>
          <i class="pi pi-check" />
        </template>
      </Inplace>
      <Inplace closable :disabled="!isEdit" @close="isEdit = false">
        <template #display v-if="countryEdit">
          Страна: {{ countryEdit }}</template
        >
        <template #content>
          <InputText v-model="countryEdit" autofocus />
        </template>
        <template #closeicon>
          <i class="pi pi-check" />
        </template>
      </Inplace>
      <Inplace closable :disabled="!isEdit" @close="isEdit = false">
        <template #display v-if="genresEdit"> Жанр: {{ genresEdit }}</template>
        <template #content v-if="genresEdit">
          <InputText v-model="genresEdit" autofocus />
        </template>
        <template #closeicon>
          <i class="pi pi-check" />
        </template>
      </Inplace>
      <Inplace closable :disabled="!isEdit" @close="isEdit = false">
        <template #display v-if="movieLengthEdit">
          Длинная фильма: {{ movieLengthEdit }} мин</template
        >
        <template #content v-if="movieLengthEdit">
          <InputText v-model="movieLengthEdit" autofocus />
        </template>
        <template #closeicon>
          <i class="pi pi-check" />
        </template>
      </Inplace>
    </div>
    <Button label="Редактировать" @click.stop="isEdit = !isEdit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useMovieStore } from "@/store/movieStore";
import { docsI } from "@/API/auth";
import Button from "primevue/button";
import Image from "primevue/image";
import Skeleton from "primevue/skeleton";
import InputText from "primevue/inputtext";
import Inplace from "primevue/inplace";

const route = useRoute();
const store = useMovieStore();
const movie = ref<docsI>();

const checkValueByKey = (arr: Array<docsI>, key: string, value: number) => {
  for (let obj of arr) {
    if (obj[key as keyof typeof obj] === value) {
      return true;
    }
  }
  return false;
};

store?.movies?.forEach((e) => {
  if (e.id === +route?.params?.id) movie.value = e;
  else if (!checkValueByKey(store?.movies, "id", +route?.params?.id))
    movie.value = {
      ageRating: 10,
      alternativeName: "",
      countries: [{ name: "-" }],
      description: "-",
      enName: "",
      genres: [{ name: "-" }],
      id: 2,
      isSeries: false,
      movieLength: 1,
      name: "Название",
      status: "string",
      ticketsOnSale: false,
      type: "string",
      typeNumber: 9,
      year: 2024,
      poster: {
        url: "",
        previewUrl: "",
      },
    };
});

const isEdit = ref<boolean>(false);

const countries = ref<Array<string>>([]);
movie.value?.countries?.forEach((e) => countries.value?.push(e.name));

const genres = ref<Array<string>>([]);
movie.value?.genres?.forEach((e) => genres.value?.push(e.name));

const movieLengthEdit = ref(movie?.value?.movieLength);
const genresEdit = ref(genres.value?.join(", "));
const countryEdit = ref(countries.value?.join(", "));
const yearEdit = ref(movie.value?.year);
const name = ref(movie.value?.name);
const year = ref(movie.value?.year);
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
}
.infos {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
