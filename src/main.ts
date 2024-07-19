import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import App from "@/App.vue";
import router from "@/router";
import "primeicons/primeicons.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import "normalize.css/normalize.css";
import '@/index.css';

const app = createApp(App);

app.use(createPinia()).use(PrimeVue).use(router).mount("#app");
