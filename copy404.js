// copy404.js
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

// Definiowanie __dirname w ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const src = path.join(__dirname, 'dist', 'index.html')
const dest = path.join(__dirname, 'dist', '404.html')

fs.copyFile(src, dest)
	.then(() => {
		console.log('index.html został pomyślnie skopiowany do 404.html')
	})
	.catch(err => {
		console.error('Błąd podczas kopiowania index.html do 404.html:', err)
		process.exit(1)
	})
