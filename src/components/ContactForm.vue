<!-- src/components/ContactForm.vue -->
<template>
	<div class="bg-gray-100 p-6 rounded-md shadow-md">
		<h3 class="text-2xl font-bold mb-4 text-primary-green">Formularz kontaktowy</h3>
		<Form @submit="onSubmit" class="space-y-4" novalidate>
			<!-- Pole Imię i nazwisko -->
			<div>
				<label class="block mb-1 font-semibold" for="name">Imię i nazwisko</label>
				<Field name="name" id="name" class="w-full p-2 border border-gray-300 rounded" required />
			</div>

			<!-- Pole Email -->
			<div>
				<label class="block mb-1 font-semibold" for="email">Email</label>
				<Field
					name="email"
					id="email"
					type="email"
					class="w-full p-2 border border-gray-300 rounded"
					:rules="emailRules"
					required />
			</div>

			<!-- Pole Wiadomość -->
			<div>
				<label class="block mb-1 font-semibold" for="message">Wiadomość</label>
				<Field
					name="message"
					id="message"
					as="textarea"
					rows="5"
					class="w-full p-2 border border-gray-300 rounded"
					required />
			</div>

			<!-- reCAPTCHA -->
			<div class="flex justify-center">
				<div id="recaptcha"></div>
			</div>

			<!-- Przycisk wysłania -->
			<button
				type="submit"
				class="bg-primary-green text-white py-2 px-6 rounded hover:bg-secondary-green transition-colors duration-300">
				Wyślij
			</button>
		</Form>
	</div>
</template>

<script setup>
import { Form, Field } from 'vee-validate'
import { email } from '@vee-validate/rules'
import { defineRule, useForm } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Definiujemy regułę walidacji dla email
defineRule('email', email)

// Łączenie reguł walidacji dla email
const emailRules = 'email'

// Konfiguracja reCAPTCHA
const recaptchaValue = ref('')
const siteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // Klucz testowy

// Inicjalizacja toastów
const toast = useToast()

// Funkcja resetująca formularz
const { resetForm } = useForm()

// Obsługa reCAPTCHA
function onVerify(token) {
	recaptchaValue.value = token
}

function onExpired() {
	recaptchaValue.value = ''
}

// Funkcja inicjalizująca reCAPTCHA
function loadRecaptcha() {
	if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
		window.grecaptcha.render('recaptcha', {
			sitekey: siteKey,
			callback: onVerify,
			'expired-callback': onExpired,
		})
		console.log('reCAPTCHA rendered')
	} else {
		console.error('Google reCAPTCHA script not loaded or render is not a function.')
	}
}

// Handle 'recaptcha-loaded' event
function handleRecaptchaLoaded() {
	console.log('recaptcha-loaded event received')
	loadRecaptcha()
}

// On mounted, listen for 'recaptcha-loaded' event
onMounted(() => {
	window.addEventListener('recaptcha-loaded', handleRecaptchaLoaded)
	// W przypadku, gdy skrypt jest już załadowany
	if (window.grecaptcha && typeof window.grecaptcha.render === 'function') {
		loadRecaptcha()
	}
})

// Clean up event listener on unmount
onBeforeUnmount(() => {
	window.removeEventListener('recaptcha-loaded', handleRecaptchaLoaded)
})

// Obsługa wysłania formularza
async function onSubmit(values) {
	console.log('Form submitted with values:', values)
	console.log('recaptchaValue:', recaptchaValue.value)

	// Sprawdź, czy CAPTCHA została ukończona
	if (!recaptchaValue.value) {
		toast.error('Proszę potwierdzić, że nie jesteś robotem.')
		return
	}

	try {
		// Wysyłka danych formularza do serwera
		const response = await fetch('http://localhost:3000/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: values.name,
				email: values.email,
				message: values.message,
				recaptchaToken: recaptchaValue.value,
			}),
		})

		console.log('Server response status:', response.status)
		const data = await response.json()
		console.log('Server response data:', data)

		if (response.ok) {
			toast.success(`Dziękujemy za kontakt, ${values.name}!`)
			// Resetowanie formularza i reCAPTCHA
			resetForm()
			recaptchaValue.value = ''
			// Reset reCAPTCHA
			if (window.grecaptcha) {
				window.grecaptcha.reset()
			}
		} else {
			toast.error(data.message || 'Wystąpił błąd podczas wysyłania formularza.')
		}
	} catch (error) {
		console.error('Error during form submission:', error)
		toast.error('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie później.')
	}
}
</script>

<style scoped></style>
