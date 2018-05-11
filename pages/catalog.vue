<template>
  <section id="catalog-page"
           class="page-view">
    <div>catalog page</div>
    <nuxt-link
      to="/"
      tag="div">
      <a>home page</a>
    </nuxt-link>
    <nuxt-link
      to="/contact"
      tag="div">
      <a>contact page</a>
    </nuxt-link>
  </section>
</template>

<script>
import vuexMappers from 'vuex'

export default {
  name: 'CatalogPage',
  components: {},
  mounted() {
    this.deactivateInProgressOverlay()
  },
  methods: {
    ...vuexMappers.mapMutations('inProgress', {
      deactivateInProgressOverlay: 'deactivateInProgressOverlay',
    }),
  },
}
</script>

<style scoped>
div {
  border: 1px solid black;
}
</style>
