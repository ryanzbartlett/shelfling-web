import './styles/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { VueQueryPlugin, vueQueryPluginOptions } from '@/plugins/VueQuery';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(VueQueryPlugin, vueQueryPluginOptions);
app.use(router);

app.mount('#app');
