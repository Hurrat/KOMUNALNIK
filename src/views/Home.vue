<!-- src/views/Home.vue -->
<script setup>
import Background from '@/components/Background.vue'
import ContentPage from '@/components/ContentPage.vue'
</script>

<template>
	<!-- Hero pełny ekran (zasłania header), bo header jest fixed -->
	<section id="hero" class="relative w-full h-screen overflow-hidden">
		<Background>
			<div class="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-center px-4">
				<h1 class="fadeIn text-4xl md:text-6xl font-bold text-white mb-6">
					Witamy na stronie<br />
					grupy Komunalnik
				</h1>
				<div class="fadeInDelayed text-xl md:text-2xl text-white font-normal max-w-3xl">
					Specjalizujemy się w efektywnym recyklingu oraz odpowiedzialnej gospodarce odpadami, a nasza działalność
					rozciąga się na całą Polskę.
				</div>
				<div class="fadeInArrow mt-8">
					<router-link
						:to="{ path: '/', hash: '#onas' }"
						class="text-white hover:text-[#ADDD00] transition-colors duration-300">
						<i class="fa-solid fa-angles-down text-4xl"></i>
					</router-link>
				</div>
			</div>
		</Background>
	</section>

	<!-- Treść główna (O nas, Kontakt) -->
	<ContentPage />
</template>
