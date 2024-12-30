<!-- src/components/Header.vue -->
<template>
	<header
		:class="[
			'fixed top-0 left-0 w-full z-50 transition-colors duration-500 ease-in-out',
			isTransparent ? 'bg-transparent' : 'bg-[#222]',
		]">
		<div class="flex justify-between items-center px-6 py-4">
			<!-- Logo -> klik przenosi na #hero -->
			<router-link :to="{ path: '/', hash: '#hero' }">
				<img src="@/assets/logo.png" alt="Logo" class="h-12" />
			</router-link>

			<!-- Menu -->
			<nav>
				<ul class="flex space-x-8 text-xl uppercase font-bold text-white">
					<li>
						<router-link
							:to="{ path: '/', hash: '#onas' }"
							class="transition-colors duration-200 hover:text-[#ADDD00]"
							:class="{ 'text-[#ADDD00]': activeSection === 'onas' }">
							O nas
						</router-link>
					</li>
					<li>
						<router-link
							:to="{ path: '/', hash: '#kontakt' }"
							class="transition-colors duration-200 hover:text-[#ADDD00]"
							:class="{ 'text-[#ADDD00]': activeSection === 'kontakt' }">
							Kontakt
						</router-link>
					</li>
					<li>
						<router-link
							to="/harmonogramy"
							class="transition-colors duration-200 hover:text-[#ADDD00]"
							:class="{ 'text-[#ADDD00]': activeSection === 'harmonogramy' }">
							Harmonogramy
						</router-link>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isTransparent = ref(true) // domyślnie przezroczysty
const activeSection = ref('hero')
const sections = ['hero', 'onas', 'kontakt']
const HEADER_HEIGHT = 64

function handleScroll() {
	const heroSection = document.getElementById('hero')
	if (heroSection) {
		const heroBottom = heroSection.getBoundingClientRect().bottom
		// Zmieniamy na #222 ~64px przed końcem sekcji hero
		isTransparent.value = heroBottom > HEADER_HEIGHT + 64
	} else {
		// inna strona
		isTransparent.value = false
	}

	// scroll spy
	let current = 'hero'
	for (const id of sections) {
		const el = document.getElementById(id)
		if (!el) continue
		const rect = el.getBoundingClientRect()
		if (rect.top <= HEADER_HEIGHT + 80) {
			current = id
		}
	}
	activeSection.value = current
}

onMounted(() => {
	if (route.path === '/') {
		window.addEventListener('scroll', handleScroll)
		setTimeout(() => {
			handleScroll()
		}, 100)
	} else {
		isTransparent.value = false
		activeSection.value = route.path.replace('/', '') || 'hero'
	}
})

watch(
	() => route.fullPath,
	newFullPath => {
		if (newFullPath === '/' || newFullPath === '/#hero') {
			isTransparent.value = true
			activeSection.value = 'hero'
			window.addEventListener('scroll', handleScroll)
			setTimeout(() => {
				handleScroll()
			}, 300)
		} else {
			if (!newFullPath.startsWith('/#')) {
				isTransparent.value = false
				activeSection.value = newFullPath.replace('/', '')
				window.removeEventListener('scroll', handleScroll)
			}
		}
	}
)

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* ewentualne dodatkowe style */
</style>
