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
  height: 100%;
}
::-webkit-scrollbar {
  width: 0;
}

@media all and (max-height: 768px) {
  .product-list-container {
    height: 65vh;
  }
}
</style>
