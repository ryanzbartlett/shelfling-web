import './styles/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import { LibraryFactory } from './api/factories/libraryFactory';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

console.log(new LibraryFactory().createManySorted(5));
