import Api from '@/api/api'
import store from '@/store/index'

export default {
	namespaced: true,
	state: {
		currentUser: null,
	},
	getters: {
		getInfo(state) {},
		checkUser(state) {
			return state.currentUser
		},
	},
	mutations: {
		SET_PROFILE_DATA(state, payload) {
			state.currentUser = payload
		},
	},
	actions: {
		getProfileData({ commit }, payload) {
			Api.get('/profile')
				.then((data) => commit('SET_PROFILE_DATA', data))
				.catch((err) => console.log(err))
		},
	},
}
