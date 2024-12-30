<!-- src/components/Footer.vue -->
<template>
	<footer class="bg-[#222] text-white text-center py-4 w-full">
		© 2004 - {{ currentYear }} -
		<span class="text-[#ADDD00]">PHU Komunalnik Sp. z o.o.</span>
	</footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
/* Dodatkowe style stópki */
</style>
