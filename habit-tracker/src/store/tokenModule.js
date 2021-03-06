import Api from '@/api/api'
import jwt_decode from 'jwt-decode'
import { getCookieByName, deleteCookie, setCookie } from '../cookies/methods'
import router from '../router/index'

export default {
	namespaced: true,
	state: {
		currentUser: null,
		token: localStorage.getItem('access_token') || null,
		refreshToken: null || getCookieByName('jwtRefresh'),
	},
	getters: {
		getUser(state) {
			return state.currentUser
		},
		getToken(state) {
			return state.token
		},
		getRefreshToken(state) {
			return state.refreshToken
		},
	},
	mutations: {
		SET_USER(state, payload) {
			state.currentUser = payload.user
			state.token = payload.token
			state.refreshToken = payload.refreshToken
		},
		LOGOUT_USER(state) {
			state.token = null
			state.refreshToken = null
			state.currentUser = null
			window.location.reload()
		},
		SET_NEW_TOKEN(state, payload) {
			state.token = payload.newToken
		},
	},
	actions: {
		async checkToken(context, payload) {
			try {
				const jwtTime = +(jwt_decode(context.state.token).exp + '000')
				if (jwtTime - Date.now() < 10000) {
					await Api.post('/token/refresh')
						.then((data) => {
							const newToken = data.data.access_token
							localStorage.setItem('access_token', newToken)
							context.commit('SET_NEW_TOKEN', {
								newToken,
							})
						})
						.then(() => {
							location.href = location.href
						})
						.catch(() => {
							router.push({ name: 'signInPage' })
							localStorage.removeItem('access_token')
							deleteCookie('jwtRefresh')
						})
				}
			} catch {
				router.push({ name: 'signInPage' })
				localStorage.removeItem('access_token')
				deleteCookie('jwtRefresh')
			}
		},

		loginUser({ commit }, payload) {
			const { user, access_token, refresh_token } = payload
			localStorage.setItem('access_token', access_token)
			getCookieByName('jwtRefresh')
				? null
				: setCookie('jwtRefresh', `${refresh_token}`, {
						secure: true,
						'max-age': 3600 * 24 * 5,
				  })

			commit('SET_USER', {
				user,
				token: access_token,
				refreshToken: refresh_token,
			})
		},
		logoutUser(context) {
			Api.post('/logout/access')
				.then(() => {
					localStorage.removeItem('access_token')
				})
				.then(
					Api.post('/logout/refresh').then(() => {
						deleteCookie('jwtRefresh')
						context.commit('LOGOUT_USER')
					}),
				)

				.catch((err) => console.error(err))
		},
	},
}
