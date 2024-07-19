<template>
  <Card style="width: 25rem; overflow: hidden" v-if="movie?.name">
    <template #header>
      <Image
        v-if="movie?.poster?.previewUrl"
        :src="movie?.poster?.previewUrl"
        alt="Лого фильма"
        width="250"
        height="300px"
      />
      <Skeleton v-else width="250px" height="300px" />
    </template>
    <template #title>{{ movie?.name }} {{ movie?.year }}</template>
    <template #subtitle>Рейтинг КП {{ movie?.rating?.kp }}</template>
    <template #footer>
      <div class="buttons">
        <Button label="Редактировать" />
        <Button label="Удалить" outlined />
      </div>
    </template>
  </Card>

</template>

<script setup lang="ts">
import { docsI } from "@/API/auth";
import Card from "primevue/card";
import Button from "primevue/button";
import Image from "primevue/image";
import Skeleton from "primevue/skeleton";

defineProps<{
  movie: docsI;
}>();
</script>

<style lang="scss">
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
