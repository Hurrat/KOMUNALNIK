// tailwind.config.cjs
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'primary-green': '#00622e',
				'secondary-green': '#00b848',
				'light-gray': '#f0f0f0',
				white: '#ffffff',
			},
			fontFamily: {
				sans: ['Montserrat', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
