<template>
  <a :class="{'is-active':isActive&&!hasActiveSubcategory}"
     @click="handleCategoryClick">
    <span :class="{'has-text-light':isActive&&!hasActiveSubcategory}"
          class="submenu-label">
      {{ category.name }}
    </span>
    <transition name="fade">
      <span v-show="category.isLoading"
            class="icon is-small">
        <i class="fas fa-spinner fa-pulse"/>
      </span>
    </transition>
  </a>
</template>

<script>
import vuexMappers from 'vuex'

export default {
  name: 'Subcategory',
  props: {
    categories: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    categoryIndex: {
      type: Number,
      default: null,
    },
  },
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      crumbs: 'crumbs',
    }),
    category() {
      return this.categories[this.categoryIndex]
    },
    isActive() {
      return this.category.isActive
    },
    hasActiveSubcategory() {
      if (!this.isActive) return false
      let subcategories = this.category.subcategories
      return (
        subcategories.findIndex(subcategory => {
          return subcategory.isActive
        }) !== -1
      )
    },
    activeSiblingCategoryIndex() {
      let activeIndex = this.categories.findIndex(category => {
        return category.isActive
      })
      return activeIndex === -1 ? null : activeIndex
    },
  },
  methods: {
    ...vuexMappers.mapActions('catalog', {
      getCategoryData: 'getCategoryData',
      getProductData: 'getProductData',
      switchCategory: 'switchCategory',
    }),
    ...vuexMappers.mapMutations('catalog', {
      deactivateCategory: 'deactivateCategory',
    }),
    handleCategoryClick() {
      if (this.activeSiblingCategoryIndex === null) {
        this.getCategoryData(this.category)
      } else if (this.isActive) {
        this.deactivateCategory(this.category)
        let parentNode = this.crumbs[this.crumbs.length - 1]
        this.getProductData({node: parentNode})
      } else {
        this.switchCategory({
          siblings: this.categories,
          targetIndex: this.categoryIndex,
        })
      }
    },
  },
}
</script>

<style scoped>
li,
a {
  cursor: default;
}

span.submenu-label {
  color: darkgray;
  font-size: 0.7vw;
  white-space: nowrap;
}

@media all and (max-width: 768px) {
  span.submenu-label {
    font-size: 100%;
  }
}

li:hover > a:not(.is-active) > span:not(.icon) {
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
