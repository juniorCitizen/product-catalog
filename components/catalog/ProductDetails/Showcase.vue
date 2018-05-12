<template>
  <div :style="setupBgImage"
       class="showcase"/>
</template>

<script>
export default {
  name: 'Showcase',
  props: {
    url: {
      type: String,
      default() {
        return null
      },
    },
  },
  computed: {
    processedUrl() {
      if (!this.url) return null
      return this.url.replace(
        '//a.storyblok.com',
        `//img2.storyblok.com/fit-in/500x300/filters:quality\\(70\\):format\\(jpg\\):fill\\(whitesmoke\\)`
      )
    },
    setupBgImage() {
      if (this.url) {
        return {
          'background-image': `url(${this.processedUrl})`,
        }
      } else {
        return {
          background: `url(${require('~/assets/placeholder.svg')})`,
          'background-size': 'contain',
          'background-position': 'center',
          'background-repeat': 'no-repeat',
        }
      }
    },
  },
}
</script>

<style scoped>
.showcase {
  width: 90%;
  height: 40vw;
  max-height: 50vh;
  margin-left: auto;
  margin-right: auto;
  background-color: whitesmoke;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
@media all and (max-width: 768px) {
  .showcase {
    width: 90%;
    height: 70vh;
    min-height: 50vh;
  }
}
</style>
