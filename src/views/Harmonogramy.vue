<!-- src/views/Harmonogramy.vue -->
<template>
	<div
		class="flex flex-col w-full h-full pt-24 bg-no-repeat bg-cover bg-center bg-[url('@/assets/tlo-harmonogramy.svg')]">
		<h1 class="sr-only">Harmonogramy</h1>

		<!-- Wyszukiwarka -->
		<div class="mb-10 flex justify-center w-full px-4">
			<input
				v-model="searchQuery"
				@input="onSearch"
				type="text"
				placeholder="Wyszukaj gminę..."
				class="border border-gray-300 p-2 rounded-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 focus:outline-none focus:ring-2 focus:ring-primary-green" />
		</div>

		<!-- Karuzela -->
		<div class="glide myCarousel w-full max-w-[1200px] flex-grow overflow-visible mx-auto">
			<div class="glide__track" data-glide-el="track">
				<ul class="glide__slides">
					<li
						class="glide__slide"
						v-for="(gmina, index) in filteredGminy"
						:key="gmina.name"
						:class="{ 'grayed-out': gmina.filteredOut }">
						<!-- Karta Flip -->
						<div class="flip-card h-64 w-48 md:w-52 lg:w-56 mx-auto" @click="toggleFlip(gmina.name)">
							<div :class="['flip-card-inner', { flipped: flipped[gmina.name] }]">
								<!-- FRONT -->
								<div
									class="flip-card-front flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-2 cursor-pointer">
									<img :src="gmina.img" :alt="gmina.name" class="h-24 w-24 object-contain mb-2" loading="lazy" />
									<h2 class="text-lg font-bold text-primary-green mb-1">
										{{ gmina.name }}
									</h2>
								</div>
								<!-- BACK -->
								<div
									class="flip-card-back flex flex-col items-center justify-center bg-white rounded-lg shadow-lg p-2 transform rotate-y-180">
									<a
										:href="gmina.pdfMiasto"
										target="_blank"
										class="bg-primary-green text-white px-3 py-1 m-1 rounded-lg hover:bg-secondary-green transition-colors">
										Miasto
									</a>
									<a
										:href="gmina.pdfGmina"
										target="_blank"
										class="bg-primary-green text-white px-3 py-1 m-1 rounded-lg hover:bg-secondary-green transition-colors">
										Gmina
									</a>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>

			<!-- Strzałki Glide -->
			<div class="glide__arrows" data-glide-el="controls">
				<button data-glide-dir="<" class="glide__arrow glide__arrow--left hover:text-primary-green transition-colors">
					<i class="fa-solid fa-chevron-left text-2xl"></i>
				</button>
				<button data-glide-dir=">" class="glide__arrow glide__arrow--right hover:text-primary-green transition-colors">
					<i class="fa-solid fa-chevron-right text-2xl"></i>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import Glide from '@glidejs/glide'
import '@glidejs/glide/dist/css/glide.core.min.css'
import '@glidejs/glide/dist/css/glide.theme.min.css'

// Pełna lista gmin (Ciepłowody, Kamiennik, Otmuchów, Boguszów-Gorce, Chojnów, Dobiegniew, Głuchołazy, Grodków, Jedlina-Zdrój, Malczyce, Niemodlin, Pakosławice, Stare Kurowo, Strzelce Krajeńskie, Wiązów, Wielichowo, Zwierzyn)
const gminy = ref([
	{
		name: 'Ciepłowody',
		img: '/KOMUNALNIK/gminy/cieplowody.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_cieplowody.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_cieplowody.pdf',
	},
	{
		name: 'Kamiennik',
		img: '/KOMUNALNIK/gminy/kamiennik.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_kamiennik.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_kamiennik.pdf',
	},
	{
		name: 'Otmuchów',
		img: '/KOMUNALNIK/gminy/otmuchow.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_otmuchow.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_otmuchow.pdf',
	},
	{
		name: 'Boguszów-Gorce',
		img: '/KOMUNALNIK/gminy/boguszow-gorce.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_boguszow_gorce.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_boguszow_gorce.pdf',
	},
	{
		name: 'Chojnów',
		img: '/KOMUNALNIK/gminy/chojnow.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_chojnow.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_chojnow.pdf',
	},
	{
		name: 'Dobiegniew',
		img: '/KOMUNALNIK/gminy/dobiegniew.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_dobiegniew.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_dobiegniew.pdf',
	},
	{
		name: 'Głuchołazy',
		img: '/KOMUNALNIK/gminy/glucholazy.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_glucholazy.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_glucholazy.pdf',
	},
	{
		name: 'Grodków',
		img: '/KOMUNALNIK/gminy/grodkow.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_grodkow.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_grodkow.pdf',
	},
	{
		name: 'Jedlina-Zdrój',
		img: '/KOMUNALNIK/gminy/jedlina-zdroj.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_jedlina_zdroj.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_jedlina_zdroj.pdf',
	},
	{
		name: 'Malczyce',
		img: '/KOMUNALNIK/gminy/malczyce.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_malczyce.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_malczyce.pdf',
	},
	{
		name: 'Niemodlin',
		img: '/KOMUNALNIK/gminy/niemodlin.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_niemodlin.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_niemodlin.pdf',
	},
	{
		name: 'Pakosławice',
		img: '/KOMUNALNIK/gminy/pakoslawice.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_pakoslawice.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_pakoslawice.pdf',
	},
	{
		name: 'Stare Kurowo',
		img: '/KOMUNALNIK/gminy/stare-kurowo.jpg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_stare_kurowo.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_stare_kurowo.pdf',
	},
	{
		name: 'Strzelce Krajeńskie',
		img: '/KOMUNALNIK/gminy/strzelce-krajenskie.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_strzelce_krajenskie.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_strzelce_krajenskie.pdf',
	},
	{
		name: 'Wiązów',
		img: '/KOMUNALNIK/gminy/wiazow.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_wiazow.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_wiazow.pdf',
	},
	{
		name: 'Wielichowo',
		img: '/KOMUNALNIK/gminy/wielichowo.svg',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_wielichowo.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_wielichowo.pdf',
	},
	{
		name: 'Zwierzyn',
		img: '/KOMUNALNIK/gminy/zwierzyn.png',
		pdfMiasto: '/KOMUNALNIK/pdf/miasto_zwierzyn.pdf',
		pdfGmina: '/KOMUNALNIK/pdf/gmina_zwierzyn.pdf',
	},
])

const searchQuery = ref('')
const flipped = ref({})
const glideInstance = ref(null)

const filteredGminy = computed(() => {
	const q = searchQuery.value.toLowerCase()
	if (!q) {
		return gminy.value.map(g => ({ ...g, filteredOut: false }))
	}
	return gminy.value.map(g => ({
		...g,
		filteredOut: !g.name.toLowerCase().includes(q),
	}))
})

// Watchers
watch(filteredGminy, newVal => {
	const matching = newVal.filter(g => !g.filteredOut)
	if (matching.length > 0 && glideInstance.value) {
		const centerIndex = Math.floor(matching.length / 2)
		const targetGmina = matching[centerIndex]
		const targetIndex = gminy.value.findIndex(g => g.name === targetGmina.name)
		if (targetIndex !== -1) {
			glideInstance.value.go(`=${targetIndex}`)
		}
	}
})

watch(searchQuery, val => {
	if (glideInstance.value) {
		if (val) {
			glideInstance.value.pause()
		} else {
			glideInstance.value.play()
		}
	}
})

// onMounted
onMounted(() => {
	gminy.value.forEach(g => {
		flipped.value[g.name] = false
	})
	glideInstance.value = new Glide('.glide', {
		type: 'carousel',
		autoplay: 3000,
		hoverpause: true,
		perView: 5,
		gap: 20,
		centered: true,
		focusAt: 'center',
		breakpoints: {
			1600: { perView: 5 },
			1280: { perView: 5 },
			1024: { perView: 4 },
			768: { perView: 3 },
			640: { perView: 1 },
		},
	}).mount()
	document.addEventListener('click', handleOutsideClick)
})

// onUnmounted
onUnmounted(() => {
	document.removeEventListener('click', handleOutsideClick)
})

function toggleFlip(name) {
	flipped.value[name] = !flipped.value[name]
}

function handleOutsideClick(e) {
	if (!e.target.closest('.flip-card')) {
		Object.keys(flipped.value).forEach(k => {
			flipped.value[k] = false
		})
	}
}

function onSearch() {
	// i tak computed
}
</script>

<style scoped>
.sr-only {
	position: absolute !important;
	width: 1px !important;
	height: 1px !important;
	padding: 0 !important;
	margin: -1px !important;
	overflow: hidden !important;
	clip: rect(0, 0, 0, 0) !important;
	white-space: nowrap !important;
	border: 0 !important;
}

/* Flip card */
.flip-card {
	perspective: 1000px;
}
.flip-card-inner {
	position: relative;
	width: 100%;
	height: 100%;
	transform-style: preserve-3d;
	transition: transform 0.8s;
}
.flip-card-inner.flipped {
	transform: rotateY(180deg);
}
.flip-card-front,
.flip-card-back {
	position: absolute;
	width: 100%;
	height: 100%;
	backface-visibility: hidden;
	border-radius: 0.5rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.flip-card-back {
	transform: rotateY(180deg);
	background-color: #f9fafb;
}

/* Glide controls */
.glide__arrow {
	background: none;
	border: none;
	cursor: pointer;
	color: #00622e;
	transition: color 0.3s;
	padding: 0.5rem;
}
.glide__arrow:hover {
	color: #009e43;
}

/* Karuzela */
.myCarousel {
	max-width: 1200px;
	height: 500px;
	display: flex;
	align-items: center;
	overflow: visible;
	margin: 0 auto;
}
.glide__slides {
	display: flex;
	align-items: center;
	height: 100%;
	padding-top: 30px;
	padding-bottom: 30px;
}

/* Wyszarzone */
.grayed-out {
	filter: grayscale(100%);
	pointer-events: none;
}

/* Kolory */
.bg-primary-green {
	background-color: #00622e;
}
.bg-secondary-green {
	background-color: #009e43;
}
.text-primary-green {
	color: #00622e;
}
</style>
