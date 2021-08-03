
import api from '../../api'

const state = {
	searchResults: [],
}

const actions = {
	SEARCH: ({ state, commit, rootState }, searchTerm) => {
		return api.search(searchTerm)
			.then(res => commit('SET_SEARCH_RESULTS', res.data.data))
	}
}

const mutations = {
	['SET_SEARCH_RESULTS'] (state, searchResults) {
		state.searchResults = searchResults
	}
}

const getters = {
	searchResults: state => {
		return state.searchResults
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
