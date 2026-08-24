import axios from 'axios'

const isProd = process.env.NODE_ENV === 'production'

export const BASE_URL = isProd
	? 'https://foodzy-back-end.onrender.com'
	: 'http://localhost:5555'

const api = axios.create({
	baseURL: `${BASE_URL}/api/v1`,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

export default api
