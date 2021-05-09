export default {
	namespaced: true,
	state: {
		activeTab: {
			activity: false,
			habits: false,
			stats: false,
			menu: false,
		},
	},
	getters: {
		getTabs(state) {
			return state
		},
	},
	mutations: {
		SET_ACTIVITY(state) {
			state.activeTab.activity = true
			state.activeTab.habits = false
			state.activeTab.stats = false
			state.activeTab.menu = false
		},
	},
	actions: {
		addActivity({ commit }) {
			commit('SET_ACTIVITY')
		},
	},
}
