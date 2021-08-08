<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style lang="scss">
@import './scss/_variables.scss';

body {
  margin: 0;
}

#app {
  color: palette(black);
  font: {
    family: $sans-serif;
    size: 20px;
  }
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  text-rendering: optimizeLegibility;
}

</style>
