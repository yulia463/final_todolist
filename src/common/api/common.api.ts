import axios from 'axios'

export const instance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	withCredentials: true,
	headers: {
		'API-KEY': 'f366fe68-e2f7-4b66-9e39-54a117a8eccb'
	}
})




