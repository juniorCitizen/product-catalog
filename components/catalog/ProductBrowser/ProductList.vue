<template>
  <div class="product-list">
    <div v-for="(product,index) in products"
         :key="index"
         class="product-card"
         @click="setActiveProductIndex(index)">
      <div class="primary-photo-frame">
        <div :style="setupBgImage(product.primaryPhoto)"
             class="primary-photo"/>
      </div>
      <div class="product-card-caption">
        <div class="product-code">
          {{ product.code }}
        </div>
        <div class="product-name">
          {{ product.name }}
        </div>
      </div>
    </div>
    <div class="spacer"/>
  </div>
</template>

<script>
import vuexMappers from 'vuex'

export default {
  name: 'ProductList',
  computed: {
    ...vuexMappers.mapGetters('catalog', {products: 'products'}),
  },
  methods: {
    ...vuexMappers.mapMutations('catalog', {
      setActiveProductIndex: 'setActiveProductIndex',
    }),
    urlHelper(url) {
      return url.replace(
        '//a.storyblok.com',
        '//img2.storyblok.com/filters:quality\\(50\\):format\\(jpg\\):fill\\(white\\)'
      )
    },
    setupBgImage(url) {
      if (url) {
        return {
          'background-image': `url(${this.urlHelper(url)})`,
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
.spacer {
  height: 1px;
  grid-column: 1/-1;
}

.product-list {
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 300px;
  padding: 5px;
  height: 75vh;
}

.product-card {
  border: 1px solid darkgray;
  border-radius: 5px;
  padding: 5px;
  background-color: lightgray;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.product-card:hover {
  border: 3px solid white;
}

.primary-photo-frame {
  border: 1px solid lightgray;
  border-radius: 5px;
  background-color: white;
  margin: 1px 1px 10px 1px;
  padding: 5px;
}

.primary-photo {
  min-height: 200px;
  background-color: white;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
}

.product-card-caption {
  margin: 5px;
  text-align: left;
  font-weight: 600;
  color: rgba(54, 54, 54, 0.7);
  cursor: default;
}

.product-code {
  font-weight: 700;
  font-size: 70%;
}

.product-name {
  font-size: 70%;
}
</style>
