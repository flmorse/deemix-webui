import Vuex from 'vuex'
import Vue from 'vue'

import home from '@/store/modules/home'
import settings from '@/store/modules/settings'
import defaultSettings from '@/store/modules/defaultSettings'
import spotifyCredentials from '@/store/modules/spotifyCredentials'
import charts from '@/store/modules/charts'
import favorites from '@/store/modules/favorites'

// Load Vuex
Vue.use(Vuex)

// Create store
export default new Vuex.Store({
	modules: {
		home,
		settings,
		defaultSettings,
		spotifyCredentials,
		charts,
		favorites
	},
	strict: process.env.NODE_ENV !== 'production'
})
