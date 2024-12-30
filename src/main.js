// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Tailwind CSS i FontAwesome
import './main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Import stylów vue3-carousel
import 'vue3-carousel/dist/carousel.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
