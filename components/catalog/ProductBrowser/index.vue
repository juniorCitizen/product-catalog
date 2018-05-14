<template>
  <div class="product-list-container">
    <product-list/>
  </div>
</template>

<script>
import ProductList from './ProductList'

export default {
  name: 'ProductBrowser',
  components: {ProductList},
}
</script>


<style scoped>
.product-list-container {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  overflow-y: scroll;
  background-color: whitesmoke;
  height: calc(100vh-195px);
}
::-webkit-scrollbar {
  width: 0;
}

@media all and (min-width: 1215px) {
  .product-list-container {
    height: calc(100vh-195px);
  }
}
@media all and (max-width: 1214px) {
  .product-list-container {
    height: calc(100vh-160px);
  }
}
</style>
