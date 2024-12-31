<!-- src/components/ContentPage.vue -->
<template>
	<!-- Sekcja "O nas" -->
	<section id="onas" class="py-16 bg-transparent scroll-mt-16">
		<div class="container mx-auto px-4">
			<h2 class="sr-only">O nas</h2>
			<!-- BLOK 1: Obrazek po LEWEJ, tekst po PRAWEJ -->
			<div class="flex flex-col md:flex-row items-center mb-12">
				<div class="w-full md:w-1/2 mb-4 md:mb-0">
					<img src="@/assets/about.png" alt="About us" class="w-full h-auto" />
				</div>
				<div class="w-full md:w-1/2 md:pl-8">
					<h3 class="text-xl font-bold mb-2 text-primary-green">Jesteśmy eko, wspieramy i edukujemy</h3>
					<p class="text-lg text-gray-800 leading-relaxed">
						Od grudnia 2004 roku spółka PHU Komunalnik Sp z o.o. rozwija się i nawiązuje współpracę z wieloma gminami w
						różnych częściach Polski. Promuje selektywny odbiór odpadów wśród wszystkich mieszkańców gmin jak i
						realizuje wiele projektów związanych z ochroną środowiska. Dzięki wieloletniemu doświadczeniu oraz wiedzy
						staramy się uczynić nasze usługi najlepszymi i stać się ekspertami na polskim rynku.
					</p>
				</div>
			</div>

			<!-- BLOK 2: Tekst po LEWEJ, obrazek po PRAWEJ -->
			<div class="flex flex-col md:flex-row items-center">
				<div class="w-full md:w-1/2 md:pr-8 order-2 md:order-1 mt-4 md:mt-0">
					<p class="text-lg text-gray-800 leading-relaxed">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ultricies ligula in metus bibendum feugiat.
						Duis euismod neque ut sapien convallis, et tempus libero iaculis. Integer consectetur sem ut consequat
						tincidunt.
					</p>
				</div>
				<div class="w-full md:w-1/2 order-1 md:order-2">
					<img src="@/assets/komunalnik-banner.png" alt="Komunalnik Banner" class="w-full h-auto" />
				</div>
			</div>
		</div>
	</section>

	<!-- Sekcja "Kontakt" -->
	<section id="kontakt" class="py-16 bg-transparent scroll-mt-16">
		<div class="container mx-auto px-4">
			<h2 class="sr-only">Kontakt</h2>
			<!-- Układ kontaktu: lewa kolumna (dane) / prawa kolumna (mapa) -->
			<div class="flex flex-col md:flex-row mb-12 rounded-lg overflow-hidden shadow-lg">
				<!-- LEWA: Dane kontaktowe (2/5) -->
				<div class="w-full md:w-1/3 flex flex-col justify-center bg-primary-green text-white p-8">
					<h3 class="text-2xl font-bold mb-6">PHU Komunalnik</h3>
					<div class="mb-6 flex items-center">
						<i class="fa-regular fa-clock mr-4 text-lg"></i>
						<span class="text-lg">8:00 - 16:00</span>
					</div>
					<div class="mb-6 flex items-center">
						<i class="fa-solid fa-phone mr-4 text-lg"></i>
						<span class="text-lg">
							<a
								href="tel:774330682"
								class="hover:text-green-300 transition-colors duration-200 cursor-pointer"
								aria-label="Zadzwoń do PHU Komunalnik">
								77 433 06 82
							</a>
						</span>
					</div>
					<div class="mb-6 flex items-center">
						<i class="fa-regular fa-envelope mr-4 text-lg"></i>
						<span class="text-lg">
							<a
								href="mailto:biuro@komunalnik.net"
								class="hover:text-green-300 transition-colors duration-200 cursor-pointer"
								aria-label="Wyślij e-mail do PHU Komunalnik">
								biuro@komunalnik.net
							</a>
						</span>
					</div>
				</div>

				<!-- PRAWA: Mapa (3/5) -->
				<div class="w-full md:w-2/3">
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1510.1167968400114!2d17.36202842004852!3d50.46524384811629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711c6ad7e09ba63%3A0x4b2f0a6af914c24a!2sP.H.U.%20Komunalnik%20sp.%20z%20o.o.!5e0!3m2!1spl!2spl!4v1735311819648!5m2!1spl!2spl"
						width="100%"
						height="100%"
						style="min-height: 350px; border: 0"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						class="h-full w-full"></iframe>
				</div>
			</div>

			<!-- Formularz kontaktowy -->
			<ContactForm />
		</div>
	</section>
</template>

<script setup>
import ContactForm from './ContactForm.vue'
</script>

<style scoped>
.container {
	max-width: 1200px;
	margin: 0 auto;
}

/* Opcjonalne dodatkowe style */
</style>
