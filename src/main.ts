import './styles/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin, vueQueryPluginOptions } from '@/plugins/VueQuery';

import App from './App.vue';
import router from './router';
import { initPrimeVue } from './plugins/PrimeVue';

const app = createApp(App);

app.use(createPinia());
app.use(VueQueryPlugin, vueQueryPluginOptions);
app.use(router);

initPrimeVue(app);

app.mount('#app');
