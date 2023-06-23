import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import Toast from "vue-toastification";
import store from './store/store';
import "vue-toastification/dist/index.css";
import '@mdi/font/css/materialdesignicons.css';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(store).use(router).use(vuetify).use(Toast).mount('#app')