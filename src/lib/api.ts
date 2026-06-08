import axios from 'axios'

const isProd = process.env.NODE_ENV === 'production'

const api = axios.create({
	baseURL: isProd
		? 'https://foodzy-back-end.onrender.com/api/v1'
		: 'http://localhost:5555/api/v1',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

export default api
