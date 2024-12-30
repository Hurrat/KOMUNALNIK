<template>
	<div class="bg-gray-100 p-6 rounded-md shadow-md">
		<h3 class="text-2xl font-bold mb-4 text-primary-green">Formularz kontaktowy</h3>
		<Form @submit.prevent="onSubmit" class="space-y-4">
			<!-- Pole Imię i nazwisko -->
			<div>
				<label class="block mb-1 font-semibold" for="name">Imię i nazwisko</label>
				<Field name="name" id="name" class="w-full p-2 border border-gray-300 rounded" :rules="required" />
				<ErrorMessage name="name" class="text-red-500 text-sm" />
			</div>

			<!-- Pole Email -->
			<div>
				<label class="block mb-1 font-semibold" for="email">Email</label>
				<Field
					name="email"
					id="email"
					type="email"
					class="w-full p-2 border border-gray-300 rounded"
					:rules="emailRules" />
				<ErrorMessage name="email" class="text-red-500 text-sm" />
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
					:rules="required" />
				<ErrorMessage name="message" class="text-red-500 text-sm" />
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
import { Form, Field, ErrorMessage } from 'vee-validate'
import { required, email } from '@vee-validate/rules'
import { defineRule } from 'vee-validate'

// Definiujemy reguły walidacji
defineRule('required', required)
defineRule('email', email)

// Możesz łączyć reguły np. "required|email" w atrybucie :rules="..."
const emailRules = 'required|email'

/**
 * Obsługa wysłania formularza:
 * - Tutaj np. wysyłasz POST do swojego endpointa
 * - Albo używasz serwisu zewnętrznego
 */
function onSubmit(values) {
	// `values` zawiera name, email, message
	alert(`Dziękujemy za kontakt, ${values.name}! (Tu wyślesz dane na serwer)`)
}
</script>

<style scoped>
/* Dodatkowe style, jeśli chcesz upiększyć formularz */
</style>
