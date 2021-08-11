import axios from 'axios'
import '../settings'

const instance = axios.create({
  baseURL: 'https://api.giphy.com/v1/'
})

function fetch (endpoint) {
	return instance.get(endpoint)
}

export default {
	search (options) {
		let searchTerm = options.searchTerm.replace(/[^\w\s]/gi, ' ');
		console.log(searchTerm)
	  return fetch(`/gifs/search?q=${searchTerm}&limit=${options.limit}&offset=${options.offset}&api_key=${ENV.giphy.apiKey}`)
	}
}
