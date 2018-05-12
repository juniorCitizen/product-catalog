<template>
  <ul :class="{'menu-list':!isSubmenu}">
    <template v-for="(category,index) in categories">
      <li :key="category.slug">
        <subcategory :key="category.slug"
                     :categories="categories"
                     :category-index="index"/>
        <sub-section v-if="category.isActive&& category.subcategories.length>0"
                     :categories="category.subcategories"
                     :is-submenu="true"/>
      </li>
    </template>
  </ul>
</template>

<script>
import Subcategory from './Subcategory'
import SubSection from './SubSection'

export default {
  name: 'SubSection',
  components: {Subcategory, SubSection},
  props: {
    categories: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    isSubmenu: {
      type: Boolean,
      required: false,
      default() {
        return false
      },
    },
  },
}
</script>

<style scoped>
li,
a {
  cursor: default;
}

li:hover > a:not(.is-active) > span:not(.icon) {
  text-shadow: 1px 1px lightgray;
}

ul.menu-list {
  margin-left: 15px;
}
</style>
