// server.js
import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(bodyParser.json())

const RECAPTCHA_SECRET_KEY = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe' // Poprawny klucz testowy

app.post('/api/contact', async (req, res) => {
	const { name, email, message, recaptchaToken } = req.body

	// Sprawdź, czy wszystkie pola są wypełnione
	if (!name || !email || !message || !recaptchaToken) {
		return res.status(400).json({ message: 'Wszystkie pola są wymagane.' })
	}

	// Weryfikacja CAPTCHA
	const verifyURL = 'https://www.google.com/recaptcha/api/siteverify'
	const params = new URLSearchParams()
	params.append('secret', RECAPTCHA_SECRET_KEY)
	params.append('response', recaptchaToken)

	try {
		const response = await axios.post(verifyURL, params.toString(), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
		console.log('reCAPTCHA verification response:', response.data)
		const { success } = response.data

		if (!success) {
			return res.status(400).json({ message: 'CAPTCHA verification failed.' })
		}

		// Procesowanie danych formularza (np. wysyłka emaila, zapis do bazy danych)
		console.log('Form data:', { name, email, message })

		res.status(200).json({ message: 'Formularz został pomyślnie wysłany.' })
	} catch (error) {
		console.error('Error verifying reCAPTCHA:', error)
		res.status(500).json({ message: 'Internal server error.' })
	}
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
