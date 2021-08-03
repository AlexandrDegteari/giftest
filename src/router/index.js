import Vue from 'vue'
import VueHead from 'vue-head'
import VueRouter from 'vue-router'

import Home from '../pages/Home.vue'
import SearchResults from '../pages/SearchResults.vue'
import NotFound from '../pages/NotFound.vue'

Vue.use(VueHead, { separator: '-' , complement: 'Gifsearch' })
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
    	path: '/',
    	name: 'home',
    	component: Home
   	},
		{
			path: '/g/:searchTerm/',
			name: 'search-results',
			component: SearchResults
		},
		{
			path: '*',
			name: 'notfound',
			component: NotFound
		}
  ],
  scrollBehavior (to, from, savedPosition) {
	  if (savedPosition) {
	    return savedPosition
	  } else {
	    return { x: 0, y: 0 }
	  }
	}
})

export default router
