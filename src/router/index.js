// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Harmonogramy from '@/views/Harmonogramy.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/harmonogramy',
		name: 'Harmonogramy',
		component: Harmonogramy,
	},
]

const router = createRouter({
	history: createWebHistory(), // lub createWebHistory('/KOMUNALNIK/') jeśli masz podfolder

	routes,

	// scrollBehavior – płynne przewijanie do hasha + offset
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition
		}
		if (to.hash) {
			return {
				// 'el' = do jakiego elementu ma scrollować (np. #kontakt)
				el: to.hash,
				behavior: 'smooth',
				top: 80, // offset, by header nie zasłaniał
			}
		}
		// Domyślnie scroll na górę
		return { top: 0 }
	},
})

export default router
