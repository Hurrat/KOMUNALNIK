<!-- src/App.vue -->
<template>
	<div class="flex flex-col min-h-screen">
		<Header />

		<!-- Sticky footer layout: main rośnie w pionie -->
		<main class="grow bg-transparent">
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
/* Globalne style (opcjonalnie) */
</style>
