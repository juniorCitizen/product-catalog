<template>
  <section v-editable="blok"
           id="home-page"
           class="page-view">
    <div class="carousel">
      <div class="slide-container">
        <img :style="carouselStyling(carousel[0].imageUrl)"
             class="slide">
      </div>
      <div id="overlay-container">
        <div v-if="mobileTitleText||titleText||mottoText"
             id="overlay-backdrop">
          <p v-if="mobileTitleText!==''"
             class="mobile-title-text">{{ mobileTitleText }}</p>
          <p v-if="titleText.length!==''"
             class="title-text">{{ titleText }}</p>
          <br>
          <p v-if="mottoText.length!==''"
             class="motto-text">{{ mottoText }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import vuexMappers from 'vuex'

export default {
  name: 'HomePage',
  data() {
    return {
      timer: null,
    }
  },
  asyncData(context) {
    let storyapi = context.app.$storyapi
    return storyapi
      .get('cdn/stories/home-page', {
        version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
      })
      .then(res => {
        let slides = res.data.story.content.carouselSlides
        return {
          blok: res.data.story.content,
          overlayContents: slides.map(carouselSlide => {
            return {
              titleText: carouselSlide.titleText,
              mobileTitleText: carouselSlide.mobileTitleText,
              mottoText: carouselSlide.mottoText,
            }
          }),
          carousel: slides.map(carouselSlide => {
            return {imageUrl: carouselSlide.imageUrl}
          }),
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed: {
    titleText() {
      return this.overlayContents[0].titleText.length > 0
        ? this.overlayContents[0].titleText
        : null
    },
    mobileTitleText() {
      return this.overlayContents[0].mobileTitleText.length > 0
        ? this.overlayContents[0].mobileTitleText
        : null
    },
    mottoText() {
      return this.overlayContents[0].mottoText.length > 0
        ? this.overlayContents[0].mottoText
        : null
    },
  },
  mounted() {
    this.endInProgressAnimation()
    this.$storyblok.init()
    this.$storyblok.on('change', () => {
      location.reload(true)
    })
    this.timer = setInterval(() => {
      this.nextSlide()
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    ...vuexMappers.mapMutations('inProgress', {
      endInProgressAnimation: 'endInProgressAnimation',
    }),
    nextSlide() {
      this.overlayContents.push(this.overlayContents.shift())
      this.carousel.push(this.carousel.shift())
    },
    carouselStyling(url) {
      return {
        'background-image': `url(${this.urlHelper(url)})`,
      }
    },
    urlHelper(url) {
      return url.replace(
        '//a.storyblok.com',
        // `//img2.storyblok.com/fit-in/1920x1080/filters:quality\\(70\\):format\\(jpg\\):fill\\(whitesmoke\\)`
        `//img2.storyblok.com/filters:quality\\(70\\):format\\(jpg\\):fill\\(whitesmoke\\)`
      )
    },
  },
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Anton);
@import url(https://fonts.googleapis.com/css?family=Roboto);

#home-page {
  align-self: stretch;
  flex-grow: 1;
}

.carousel {
  width: 100%;
  height: 100%;
}

.slide-container {
  width: 100%;
  height: 100%;
}

.slide {
  width: 100%;
  height: 100%;
  background-size: stretch;
  background-position: center;
  background-repeat: no-repeat;
}

#overlay-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

#overlay-backdrop {
  align-self: center;
  background-color: rgba(0%, 0%, 0%, 0.3);
  padding: 5%;
}

.title-text,
.mobile-title-text,
.motto-text {
  white-space: pre-line;
  text-align: center;
  font-style: italic;
  color: white;
  transform: rotate(-4deg);
}

.title-text,
.mobile-title-text {
  font-family: 'Anton';
}

.motto-text {
  font-family: 'Roboto';
}

@media screen and (min-width: 480px) {
  .title-text {
    font-size: xx-large;
  }
  .mobile-title-text {
    display: none;
  }
  .motto-text {
    font-size: large;
    font-weight: 200;
  }
}

@media screen and (max-width: 480px) {
  #overlay-backdrop {
    width: 100%;
    padding-top: 20%;
    padding-bottom: 20%;
    transform: scale(0.8);
  }
  .title-text {
    display: none;
  }
  .mobile-title-text {
    font-size: 1.5em;
  }
  .motto-text {
    font-size: 0.8em;
  }
}
</style>
