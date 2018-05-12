<template>
  <section id="catalog-page"
           class="page-view">
    <aside class="category-menu-container">
      <category-menu/>
    </aside>
    <header class="breadcrumb-container">
      <breadcrumbs/>
    </header>
    <article class="product-browser-container">
      <product-browser/>
    </article>
    <footer class="pagination-container">
      <pagination-control v-if="needPagination"/>
    </footer>
    <product-details v-if="activeProduct"/>
  </section>
</template>

<script>
import vuexMappers from 'vuex'
import CategoryMenu from '~/components/catalog/CategoryMenu'
import Breadcrumbs from '~/components/catalog/Breadcrumbs'
import ProductBrowser from '~/components/catalog/ProductBrowser'
import PaginationControl from '~/components/catalog/PaginationControl'
import ProductDetails from '~/components/catalog/ProductDetails'

export default {
  name: 'CatalogPage',
  components: {
    CategoryMenu,
    Breadcrumbs,
    ProductBrowser,
    PaginationControl,
    ProductDetails,
  },
  fetch({app, store}) {
    let prodMode = process.env.NODE_ENV === 'production'
    let apiUrl = 'cdn/stories/product-catalog-page'
    return app.$storyapi
      .get(apiUrl, {
        version: prodMode ? 'published' : 'draft',
        is_startpage: true,
      })
      .then(res => {
        let data = res.data
        store.commit('catalog/registerCategory', {data})
        return Promise.resolve()
      })
      .then(() => {
        let node = store.state.catalog.catalog
        return store
          .dispatch('catalog/getProductData', {node})
          .catch(error => Promise.reject(error))
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      activeProduct: 'activeProduct',
      paginationInfo: 'paginationInfo',
    }),
    needPagination() {
      return this.paginationInfo.totalProducts > this.paginationInfo.perPage
    },
  },
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
#catalog-page {
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
  padding: 5px 20px;
  display: grid;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  grid-template-columns: max-content auto;
  grid-template-rows: min-content auto min-content;
}
.category-menu-container {
  grid-column: 1/2;
  grid-row: 1/-1;
}
@media all and (max-width: 1088px) {
  .category-menu-container {
    display: none;
  }
}
.breadcrumb-container {
  grid-column: 2/-1;
  grid-row: 1/2;
  justify-self: center;
}
.product-browser-container {
  grid-column: 2/-1;
  grid-row: 2/3;
  justify-self: stretch;
  display: flex;
  flex-flow: column;
}
.pagination-container {
  grid-column: 2/-1;
  grid-row: 3/4;
  justify-self: end;
}
</style>
