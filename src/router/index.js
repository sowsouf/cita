import Vue 		from 'vue'
import Router 		from 'vue-router'

import Home 		from '@/components/home/home'
import AddInvocation 	from '@/components/invocations/add/invocations'

Vue.use(Router)

export default new Router({
	routes: [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/add/invocations',
		name: 'AddInvocation',
		component: AddInvocation
	}
	]
})
