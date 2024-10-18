import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import router from '@/routes/index';

const admin = JSON.parse(sessionStorage.getItem("menu") as any) ? JSON.parse(sessionStorage.getItem("menu") as any).isAdmin : 0;
const index = admin ? "admin" : "";

const app = createApp(App);
app.directive("permission", (el, bind) => {
    if (index == "admin") {
        if(bind.value == "admin") {
            el.style.display = "block";
        } else if(bind.value = "admin_inline") {
            el.style.display = "inline";
        } else {
            el.style.display = "none";
        }
    } else {
        el.style.display = "none";
    }
});
app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.mount('#app');