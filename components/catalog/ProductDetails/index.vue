<template>
  <div id="product-details"
       class="product-modal"
       @click.self="setActiveProductIndex(null)">
    <span :class="closeButtonSize"
          class="icon has-text-danger">
      <i class="fas fa-times-circle"
         @click="setActiveProductIndex(null)"/>
    </span>
    <div class="product-modal-content">
      <showcase :url="photoOnDisplay"/>
      <info-display :photo-on-display="photoOnDisplay"
                    @gallerySelection="photoOnDisplay=$event"/>
    </div>
  </div>
</template>

<script>
import vuexMappers from 'vuex'

import Showcase from './Showcase'
import InfoDisplay from './InfoDisplay'
import Gallery from './Gallery'
import Features from './Features'
import Specification from './Specification'

export default {
  name: 'ProductDetails',
  components: {
    Showcase,
    InfoDisplay,
    Gallery,
    Features,
    Specification,
  },
  data() {
    return {
      photoOnDisplay: null,
    }
  },
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      product: 'activeProduct',
    }),
    closeButtonSize() {
      return {
        'is-large': this.$mq !== 'mobile',
        'is-small': this.$mq === 'mobile',
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
span.icon {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1001;
}

.product-modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: hide;
  display: flex;
}

.product-modal-content {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  overflow-y: scroll;
  align-self: center;
  max-height: 90%;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 15px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
  border-radius: 5px;
  background-color: whitesmoke;
  overflow: scroll;
  animation-name: modal-open;
  animation-duration: 1s;
  display: grid;
}
::-webkit-scrollbar {
  width: 0;
}

@media all and (min-width: 769px) {
  .product-modal-content {
    align-self: center;
    padding: 15px;
    height: 90%;
    width: 90%;
    grid-column-gap: 10px;
    grid-template-columns: auto max-content;
  }
}

@media all and (max-width: 768px) {
  .product-modal-content {
    align-self: center;
    padding: 5px;
    height: 95vh;
    margin-top: auto;
    margin-bottom: 5px;
    width: 95%;
    grid-row-gap: 10px;
    grid-template-rows: min-content auto;
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
