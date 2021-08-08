<template>
  <div>
    <navbar></navbar>

    <spinner v-if="loading"></spinner>
    <masonry-grid
      v-else
      :searchTerm="searchTerm"
      :items="searchResults">
    </masonry-grid>
    <div class="flex-center">
      <sliding-pagination
          :current="options.currentPage"
          :total="Math.ceil(total / options.limit)"
          @page-change="pageChangeHandler"
      ></sliding-pagination>
    </div>
  </div>
</template>
<style>
.flex-center{
  display: flex;
  justify-content: center;
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'
import Navbar from '../components/Navbar.vue'
import Spinner from '../components/Spinner.vue'
import MasonryGrid from '../components/Grid/Grid.vue'
import SlidingPagination from 'vue-sliding-pagination'


export default {
  name: 'home',

  data: () => ({
    searchTerm: '',
    loading: false,
    options:{
      limit: 20,
      currentPage: 0,
      searchTerm: '',
      offset: 1
    }
  }),

  components: {
    Navbar,
    Spinner,
    Error,
    MasonryGrid,
    SlidingPagination
  },

  created () {
    this.fetchResults()
  },

  watch: {
    '$route': 'fetchResults',
  },
  computed: {
    ...mapGetters('giphy', [
      'searchResults'
    ]),
    ...mapGetters('giphy', [
      'total'
    ])
  },

  methods: {
    ...mapActions('giphy', [
      'SEARCH'
    ]),
    pageChangeHandler(selectedPage) {
      console.log(selectedPage)
      this.options.currentPage = selectedPage
      this.fetchResults()
    },
    fetchResults () {
      this.error = null
      this.loading = true
      this.options.searchTerm = this.$route.params.searchTerm
      this.options.offset = this.options.limit * this.options.currentPage
      this.$emit('updateHead')
      this.SEARCH(this.options)
        .then(() => this.loading = false)
        .catch(err => {
          this.error = err
          this.loading = false
        })
    },
  },

  head: {
    title: function () {
      return { inner: this.searchTerm }
    }
  }
}
</script>
