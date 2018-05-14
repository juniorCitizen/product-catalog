<template>
  <div class="info-display">
    <div :class="applyTabSize"
         class="tabs is-boxed">
      <ul>
        <li :class="{'is-active':infoOnDisplay==='photos'}"
            @click="infoOnDisplay='photos'">
          <a>PHOTOS</a>
        </li>
        <li :class="{'is-active':infoOnDisplay==='features'}"
            @click="infoOnDisplay='features'">
          <a>FEATURES</a>
        </li>
        <li :class="{'is-active':infoOnDisplay==='specification'}"
            @click="infoOnDisplay='specification'">
          <a>SPECS</a>
        </li>
      </ul>
    </div>
    <gallery v-if="infoOnDisplay==='photos'"
             :primary-photo-url="product.primaryPhoto"
             :secondary-photo-urls="product.secondaryPhotos"
             :photo-on-display="photoOnDisplay"
             @clicked="$emit('gallerySelection',$event)"/>
    <features v-if="infoOnDisplay==='features'"
              :text="product.specification.text"/>
    <Specification v-if="infoOnDisplay==='specification'"
                   :text="product.specification.details"/>
  </div>
</template>

<script>
import vuexMappers from 'vuex'

import Gallery from './Gallery'
import Features from './Features'
import Specification from './Specification'

export default {
  name: 'InfoDisplay',
  components: {
    Gallery,
    Features,
    Specification,
  },
  props: {
    photoOnDisplay: {
      type: String,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      infoOnDisplay: 'photos',
    }
  },
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      product: 'activeProduct',
    }),
    applyTabSize() {
      return {
        'is-small': this.$mq === 'mobile',
      }
    },
  },
}
</script>

<style scoped>
div.tabs ul li {
  font-weight: 900;
}
</style>
