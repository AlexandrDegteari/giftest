<template>
  <div
    :id="`masonry-grid-cell-${id}`"
    class="masonry-grid-cell"
  >
    <div
      v-if="currentSrc == null"
      class="image-container">
      <img
        :src="smallSrc"
        @click="onSelect"
        class="blur">
    </div>

    <div
      v-else
      class="image-container">
      <img
        :src="src"
        @click="onSelect">
    </div>
  </div>
</template>

<script>

export default {
  name: 'masonry-grid-cell',

  data: () => ({
    currentSrc: null,
    showFavorite: false,
  }),
  props: [
    'id',
    'src',
    'smallSrc',
    'data'
  ],

  mounted: function () {
    let hiResImg = new Image()
    hiResImg.onload = () => {
      this.currentSrc = this.src
    }
    hiResImg.src = this.src
  },

  methods: {
    onSelect () {
      this.$emit('onSelect', this.id)
    },
  }
}
</script>

<style lang="scss">
@import '../../scss/_variables.scss';
@import '../../scss/_functions.scss';

.masonry-grid-cell {
  break-inside: avoid;
  page-break-inside: avoid;
  padding-bottom: .5rem;
  position: relative;

  .image-container {
    overflow: hidden;
  }

  .blur {
    filter: blur(10px);
  }

  img {
    border-radius: $border-radius;
    cursor: pointer;
    width: 100%;
    height: auto;
    vertical-align: top;
  }
}
</style>
