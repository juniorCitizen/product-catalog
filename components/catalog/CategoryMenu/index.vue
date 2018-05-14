<template>
  <aside class="menu">
    <template v-for="(category,index) in catalog.subcategories">
      <root-category :key="category.slug+'-root-category'"
                     :category="category"
                     @clicked="handleCategoryClick(index, category)"/>
      <sub-section v-if="category.isActive&&category.subcategories.length>0"
                   :key="category.slug+'-subcategories'"
                   :categories="category.subcategories"/>
    </template>
  </aside>
</template>

<script>
import vuexMappers from 'vuex'

import RootCategory from './RootCategory'
import SubSection from './SubSection'

export default {
  name: 'CategoryMenu',
  components: {
    RootCategory,
    SubSection,
  },
  computed: {
    ...vuexMappers.mapState('catalog', {
      catalog: 'catalog',
    }),
    ...vuexMappers.mapGetters('catalog', {
      activeRootCategoryIndex: 'activeRootCategoryIndex',
    }),
  },
  methods: {
    ...vuexMappers.mapActions('catalog', {
      getCategoryData: 'getCategoryData',
      getProductData: 'getProductData',
    }),
    ...vuexMappers.mapMutations('catalog', {
      deactivateCategory: 'deactivateCategory',
      clearProductList: 'clearProductList',
    }),
    handleCategoryClick(index, category) {
      if (this.activeRootCategoryIndex === null) {
        this.getCategoryData(category)
      } else if (this.activeRootCategoryIndex === index) {
        this.getCategoryData(this.catalog)
      } else {
        this.clearProductList()
        this.deactivateCategory(
          this.catalog.subcategories[this.activeRootCategoryIndex]
        )
        this.getCategoryData(category)
      }
    },
  },
}
</script>
