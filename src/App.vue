<!-- src/App.vue -->
<template>
	<div class="flex flex-col min-h-screen bg-[url('@/assets/tlo-harmonogramy.svg')] bg-cover bg-no-repeat bg-center">
		<Header />

		<!-- Sticky footer layout -->
		<main class="grow">
			<router-view />
		</main>

		<Footer />
	</div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<style>
/* ewentualne globalne style */
</style>
