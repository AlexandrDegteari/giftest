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
      <pagination
          :records="total"
          v-model="options.currentPage"
          :per-page="options.limit"
          @paginate="pageChangeHandler">
      </pagination>
    </div>
  </div>
</template>
<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css";
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
import Pagination from 'vue-pagination-2';

export default {
  name: 'home',

  data: () => ({
    searchTerm: '',
    loading: false,
    options:{
      limit: 20,
      currentPage: 1,
      searchTerm: '',
      offset: 1
    }
  }),

  components: {
    Navbar,
    Spinner,
    Error,
    MasonryGrid,
    Pagination
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
