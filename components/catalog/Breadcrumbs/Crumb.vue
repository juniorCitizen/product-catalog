<template>
  <li>
    <a @click="handleClick">
      <span :class="{'final-crumb':isFinalCrumb}">
        <slot/>
      </span>
      <span v-if="isFinalCrumb"
            class="final-crumb">
        &nbsp;({{ paginationInfo.totalProducts }} ITEMS)
      </span>
    </a>
  </li>
</template>

<script>
import vuexMappers from 'vuex'

export default {
  name: 'Crumb',
  props: {
    isFinalCrumb: {
      type: Boolean,
      default() {
        return false
      },
    },
    category: {
      type: Object,
      default() {
        return this.catalog
      },
    },
  },
  computed: {
    ...vuexMappers.mapState('catalog', {
      catalog: 'catalog',
    }),
    ...vuexMappers.mapGetters('catalog', {
      paginationInfo: 'paginationInfo',
    }),
  },
  methods: {
    ...vuexMappers.mapActions('catalog', {
      getCategoryData: 'getCategoryData',
    }),
    handleClick() {
      this.getCategoryData(this.category)
    },
  },
}
</script>

<style scoped>
span {
  color: rgba(54, 54, 54, 0.7);
  white-space: nowrap;
}

li:hover > a > span:not(.final-crumb) {
  border-bottom: 1px solid black;
}
</style>
