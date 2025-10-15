// Importations des styles et scripts nécessaires
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';





// Importation de Bootstrap (si tu en as besoin)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//import PrimeVue from 'primevue/config';
//import Button from "primevue/button";

// Création de l'application Vue
const app = createApp(App);
//app.use(PrimeVue);
//app.component('Button', Button);

app.use(router);



app.mount('#app');
