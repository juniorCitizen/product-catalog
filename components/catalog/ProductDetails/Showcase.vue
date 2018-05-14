<template>
  <div class="showcase">
    <div class="product-title-text">
      {{ product.code }} - {{ product.name }}
    </div>
    <div :style="setupBgImage"
         class="photo-frame"/>
    <p class="product-description-text">{{ product.description }}</p>
  </div>
</template>

<script>
import vuexMappers from 'vuex'

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
    ...vuexMappers.mapGetters('catalog', {
      product: 'activeProduct',
    }),
    processedUrl() {
      if (!this.url) return null
      return this.url.replace(
        '//a.storyblok.com',
        `//img2.storyblok.com/filters:quality\\(100\\):format\\(jpg\\):fill\\(whitesmoke\\)`
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
  display: flex;
  flex-direction: column;
}

.product-title-text,
.product-description-text {
  padding: 5px;
  margin-left: auto;
  margin-right: auto;
  width: content;
}

.product-title-text {
  flex-grow: 0;
  text-align: center;
  font-weight: 900;
  text-align: center;
}

.photo-frame {
  flex-grow: 1;
  min-height: 60vh;
  background-color: whitesmoke;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.product-description-text {
  flex-grow: 0;
  text-align: start;
  font-weight: 400;
  white-space: pre-line;
}

@media all and (max-width: 768px) {
  .photo-frame {
    min-height: 50vw;
  }
  .product-title-text {
    font-weight: 900;
  }
  .product-description-text {
    font-size: 75%;
    font-weight: 400;
  }
  .product-title-text,
  .product-description-text {
    text-align: start;
    padding: 3px;
  }
}
</style>
