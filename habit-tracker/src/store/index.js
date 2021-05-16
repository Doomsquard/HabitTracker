import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './UserModule.js'
import tabsModule from '@/store/tabsModule.js'
import tokenModule from '@/store/tokenModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: { tabsModule, tokenModule, userModule },
})
