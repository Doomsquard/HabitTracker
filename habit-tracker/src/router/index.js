import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
import ActivityPage from '@/views/ActivityPage'
import HabitPage from '@/views/HabitPage'
import StatsPage from '@/views/StatsPage'
import BalancePage from '@/views/BalancePage'
import NavBar from '@/components/NavBar'
import signPage from '@/views/SignPage'
import SettingPage from '@/views/SettingPage'

import store from '@/store/index'

Vue.use(VueRouter)

const navBarComponent = (name) => {
	return {
		path: '',
		name: name,
		component: (resolve) => resolve(NavBar),
	}
}

const routes = [
	{
		path: '/activity',
		component: ActivityPage,
		children: [navBarComponent('activityPage')],
	},
	{
		path: '/habits',
		component: HabitPage,
		children: [navBarComponent('habitPage')],
	},
	{
		path: '/statistics',
		component: StatsPage,
		children: [navBarComponent('statsPage')],
	},
	{
		path: '/balance',
		component: BalancePage,
		children: [navBarComponent('balancePage')],
	},
	{
		path: '/setting',
		component: SettingPage,
		children: [navBarComponent('settingPage')],
	},
	{
		path: '/signin',
		name: 'signInPage',
		component: signPage,
	},
	{
		path: '/signup',
		name: 'signUpPage',
		component: signPage,
	},
	{
		path: '/*',
		name: 'notFindPath',
		redirect: {
			path: '/activity',
		},
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.name !== 'signUpPage' && to.name !== 'signInPage') {
		store.dispatch('tokenModule/checkToken')
	}
	const currentUser = store.getters['tokenModule/getToken']

	if (!currentUser && router.history.current.path !== '/signin' && to.path !== '/signin') {
		next('/signin')
	} else {
		next()
	}
	next()
})

export default router
