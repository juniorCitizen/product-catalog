<template>
  <div id="product-details"
       class="product-modal"
       @click.self="setActiveProductIndex(null)">
    <div class="product-modal-content">
      <header class="product-modal-heading">
        <span>{{ product.code }}</span>
        <span> - </span>
        <span>{{ product.name }}</span>
        <span>
          <a class="delete is-pulled-right"
             @click="setActiveProductIndex(null)"/>
        </span>
      </header>
      <showcase :url="photoOnDisplay"/>
      <div :class="applyTabSize"
           class="tabs is-centered is-boxed">
        <ul>
          <li :class="{'is-active':infoOnDisplay==='photos'}"
              @click="infoOnDisplay='photos'">
            <a>Photos</a>
          </li>
          <li :class="{'is-active':infoOnDisplay==='description'}"
              @click="infoOnDisplay='description'">
            <a>Desc</a>
          </li>
          <li :class="{'is-active':infoOnDisplay==='features'}"
              @click="infoOnDisplay='features'">
            <a>Features</a>
          </li>
          <li :class="{'is-active':infoOnDisplay==='specification'}"
              @click="infoOnDisplay='specification'">
            <a>Specs</a>
          </li>
        </ul>
      </div>
      <gallery v-if="infoOnDisplay==='photos'"
               :primary-photo-url="product.primaryPhoto"
               :secondary-photo-urls="product.secondaryPhotos"
               :photo-on-display="photoOnDisplay"
               @clicked="photoOnDisplay=$event"/>
      <description v-if="infoOnDisplay==='description'"
                   :text="product.description"/>
      <features v-if="infoOnDisplay==='features'"
                :text="product.specification.text"/>
      <Specification v-if="infoOnDisplay==='specification'"
                     :text="product.specification.details"/>
    </div>
  </div>
</template>

<script>
import vuexMappers from 'vuex'

import Description from './Description'
import Features from './Features'
import Gallery from './Gallery'
import Showcase from './Showcase'
import Specification from './Specification'

export default {
  name: 'ProductDetails',
  components: {
    Description,
    Features,
    Gallery,
    Showcase,
    Specification,
  },
  data() {
    return {
      photoOnDisplay: null,
      infoOnDisplay: 'photos',
    }
  },
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      product: 'activeProduct',
    }),
    applyTabSize() {
      return {
        'is-small': this.$mq === 'tiny' || this.$mq === 'smallerMobile',
      }
    },
  },
  mounted() {
    this.photoOnDisplay = this.product.primaryPhoto
  },
  methods: {
    ...vuexMappers.mapMutations('catalog', {
      setActiveProductIndex: 'setActiveProductIndex',
    }),
  },
}
</script>


<style scoped>
.product-modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hide;
  display: flex;
}
.product-modal-content {
  align-self: center;
  padding: 15px;
  max-height: 95%;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
  border-radius: 5px;
  background-color: whitesmoke;
  overflow: auto;
  animation-name: modal-open;
  animation-duration: 1s;
}
header {
  text-align: center;
  font-weight: 800;
  font-size: 36px;
}
@media all and (max-width: 768px) {
  .product-modal-content {
    align-self: center;
    padding: 15px;
    height: 85%;
    width: 80%;
    overflow: auto;
    animation-name: modal-open;
    animation-duration: 1s;
  }
  header {
    text-align: start;
    font-weight: 600;
    font-size: 3vw;
  }
}

@keyframes modal-open {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
