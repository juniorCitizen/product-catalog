<template>
  <div class="gallery">
    <template v-if="urls.length===0">
      <p class="placeholder-text">
        Product images unavailable
      </p>
    </template>
    <template v-else>
      <div v-for="(processedUrl,index) in processedUrls"
           :key="index"
           :class="{'on-display':index===onDisplayIndex}"
           :style="{'background-image':`url(${processedUrl})`}"
           class="gallery-photo"
           @click="$emit('clicked', urls[index])"/>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  props: {
    primaryPhotoUrl: {
      type: String,
      default() {
        return null
      },
    },
    secondaryPhotoUrls: {
      type: Array,
      default() {
        return []
      },
    },
    photoOnDisplay: {
      type: String,
      default() {
        return null
      },
    },
  },
  computed: {
    urls() {
      if (!this.primaryPhotoUrl) return []
      let urls = this.secondaryPhotoUrls.map(url => {
        return url
      })
      urls.unshift(this.primaryPhotoUrl)
      return urls
    },
    processedUrls() {
      return this.urls.map(url => {
        return url.replace(
          '//a.storyblok.com',
          '//img2.storyblok.com/fit-in/100x100/filters:quality\\(50\\):format\\(jpg\\):fill\\(whitesmoke\\)'
        )
      })
    },
    onDisplayIndex() {
      return this.urls.findIndex(url => {
        return url === this.photoOnDisplay
      })
    },
  },
}
</script>

<style scoped>
.gallery {
  width: 90%;
  padding: 2px;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  grid-auto-rows: 70px;
  grid-gap: 2px;
}
.gallery-photo {
  border: 1px solid lightgray;
  background-color: whitesmoke;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.gallery-photo.on-display {
  border: 1px solid blue;
}
.placeholder-text {
  width: max-content;
  font-weight: 900;
}
</style>
