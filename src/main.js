// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Tailwind CSS i FontAwesome
import './main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Import stylów vue3-carousel
import 'vue3-carousel/dist/carousel.css'

// Import Vue Toastification i jego stylów
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

// Konfiguracja Toastification
const toastOptions = {
	position: 'bottom-right', // Zmieniono na 'bottom-right'
	timeout: 5000,
	closeOnClick: true,
	pauseOnFocusLoss: true,
	pauseOnHover: true,
	draggable: true,
	draggablePercent: 0.6,
	showCloseButtonOnHover: false,
	hideProgressBar: false,
	closeButton: 'button',
	icon: true,
	rtl: false,
	theme: 'colored', // Użyj motywu 'colored'
	transition: 'Vue-Toastification__fade', // Możliwe opcje: 'Vue-Toastification__bounce', 'Vue-Toastification__fade', 'Vue-Toastification__slide'
}

app.use(router)
app.use(Toast, toastOptions)

app.mount('#app')
