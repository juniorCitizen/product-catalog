<template>
  <div id="in-progress"
       :style="topPos">
    <div class="caption-text">
      <span class="icon has-text-warning">
        <i class="fas fa-2x fa-spinner fa-pulse"/>
      </span>
      <span class="loading-text has-text-warning is-unselectable">
        LOADING...
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InProgress',
  data() {
    return {yOffset: 0}
  },
  computed: {
    topPos() {
      return {top: `${this.yOffset}px`}
    },
  },
  mounted() {
    this.yOffset = window.pageYOffset
    window.addEventListener('scroll', () => {
      this.yOffset = window.pageYOffset
    })
  },
}
</script>

<style scoped>
#in-progress {
  z-index: 1000;
  position: absolute;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.8);
  display: grid;
}

.caption-text {
  align-self: center;
  justify-self: center;
}

.loading-text {
  margin-left: 10px;
  font-size: 180%;
  font-weight: 800;
  cursor: default;
}
</style>
