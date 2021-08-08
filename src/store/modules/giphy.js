
import api from '../../api'

const state = {
	searchResults: [],
	total: null
}

const actions = {
	SEARCH: ({ state, commit, rootState }, searchTerm) => {
		return api.search(searchTerm)
			.then(res => commit('SET_SEARCH_RESULTS', res.data))
	}
}

const mutations = {
	['SET_SEARCH_RESULTS'] (state, searchResults) {
		state.searchResults = searchResults.data
		state.total = searchResults.pagination.total_count
	}
}

const getters = {
	searchResults: state => {
		return state.searchResults
	},
	total: state => {
		return state.total
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations,
	getters
}
