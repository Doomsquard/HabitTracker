import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
import ActivityPage from '@/views/ActivityPage'
import HabitPage from '@/views/HabitPage'
import StatsPage from '@/views/StatsPage'
import MenuPage from '@/views/MenuPage'
import NavBar from '@/components/NavBar'

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
		path: '/',
		component: HomePage,
		children: [navBarComponent('homePage')],
	},
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
		path: '/menu',
		component: MenuPage,
		children: [navBarComponent('menuPage')],
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

// router.beforeEach((to, from, next) => {
// 	// console.log(to, from)
// 	if (router.history.current.name !== to.name) {
// 		next()
// 	}
// })

export default router
