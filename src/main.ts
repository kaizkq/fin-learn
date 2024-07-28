import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import router from './router';

const app = createApp(App)
app.use(Antd)
app.use(router);
app.mount('#app')
