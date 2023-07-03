import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';

createApp(App).use(Vant).use(store).use(router).use(Lazyload, {
    lazyComponent: true,
}).mount('#app')
