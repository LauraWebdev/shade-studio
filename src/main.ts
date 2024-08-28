import './assets/app.scss';
import 'remixicon/fonts/remixicon.css';
import '@fontsource-variable/outfit';
import Vue3ColorPicker from 'vue3-colorpicker';
import 'vue3-colorpicker/style.css';

import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.use(Vue3ColorPicker);
app.mount('#app');
