<template>
  <Card style="width: 25rem; overflow: hidden">
    <template #header>
      <div @click="$router.push({ name: MOVIE_ID, params: { id: movie?.id } })">
        <Image
          v-if="movie?.poster?.previewUrl"
          :src="movie?.poster?.previewUrl"
          alt="Лого фильма"
          width="250"
          height="300px"
        />
        <Skeleton v-else width="250px" height="300px" />
      </div>
    </template>
    <template #title>
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
    </template>
    <template #subtitle>
      <Inplace closable :disabled="!isEdit" @close="isEdit = false">
        <template #display> Рейтинг КП {{ ratingKp }} </template>
        <template #content>
          <InputText v-model="ratingKp" autofocus />
        </template>
        <template #closeicon>
          <i class="pi pi-check" />
        </template>
      </Inplace>
    </template>
    <template #footer>
      <Toast />
      <ConfirmPopup />
      <div class="buttons">
        <Button label="Редактировать" @click.stop="isEdit = !isEdit" />
        <Button
          @click="removeMovie($event, movie.id)"
          label="Удалить"
          severity="danger"
          outlined
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { docsI } from "@/API/auth";
import Card from "primevue/card";
import Button from "primevue/button";
import Image from "primevue/image";
import Skeleton from "primevue/skeleton";
import Inplace from "primevue/inplace";
import { useMovieStore } from "@/store/movieStore";
import { MOVIE_ID } from "@/router/routes.json";
import InputText from "primevue/inputtext";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import ConfirmPopup from "primevue/confirmpopup";
import Toast from "primevue/toast";

const props = defineProps<{
  movie: docsI;
}>();

const isEdit = ref<boolean>(false);

const ratingKp = ref(props.movie?.rating?.kp);
const name = ref(props.movie?.name);
const year = ref(props.movie?.year);

const store = useMovieStore();

const confirm = useConfirm();
const toast = useToast();

const removeMovie = (event: Event, id: number) => {
  confirm.require({
    target: event.currentTarget,
    message: "Хотите удалить этот фильм?",
    icon: "pi pi-info-circle",
    rejectClass: "p-button-secondary p-button-outlined p-button-sm",
    acceptClass: "p-button-danger p-button-sm",
    rejectLabel: "Отмена",
    acceptLabel: "Удалить",
    accept: () => {
      store.setMovies(store.movies?.filter((e) => e?.id !== id) as Array<docsI>);
      toast.add({
        severity: "info",
        detail: "Фильм удалён",
        life: 3000,
      });
    },
    reject: () => {
      toast.add({
        severity: "error",
        detail: "Вы отменили удаление",
        life: 3000,
      });
    },
  });
};
</script>

<style scoped lang="scss">
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.p-inplace-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
