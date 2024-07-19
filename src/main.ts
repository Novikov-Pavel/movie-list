import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import "normalize.css/normalize.css";
import "primevue/resources/themes/aura-light-green/theme.css";

const app = createApp(App);

app.use(createPinia()).use(PrimeVue).use(router).mount("#app");
