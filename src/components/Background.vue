<template>
	<div class="relative w-full h-screen overflow-hidden">
		<!-- Wideo w tle -->
		<video class="absolute top-0 left-0 w-full h-full object-cover" autoplay loop muted playsinline>
			<source src="@/assets/background.mp4" type="video/mp4" />
			<!-- <source src="@/assets/background.webm" type="video/webm" /> -->
			Twoja przeglądarka nie wspiera wideo w tle.
		</video>

		<!-- Ciemna nakładka (overlay) -->
		<div class="absolute top-0 left-0 w-full h-full bg-black opacity-50" aria-hidden="true"></div>

		<!-- Slot na Header i warstwę hero -->
		<div class="relative z-10 w-full h-full">
			<slot />
		</div>
	</div>
</template>

<script setup>
// Brak dodatkowej logiki
</script>

<style scoped>
/* Jeżeli chcesz dodatkowe style, tu albo w plikach Tailwind. */
</style>
