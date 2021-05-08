import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage'
import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'

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
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
