<template>
  <nav :class="dynamicSizeClass"
       class="pagination is-centered"
       role="navigation">
    <a v-if="$mq!=='mobile'"
       :disabled="currentPage===1"
       class="pagination-previous"
       @click="previousPage">Previous</a>
    <a v-if="$mq!=='mobile'"
       :disabled="currentPage===totalPages||totalPages===0"
       class="pagination-next"
       @click="nextPage">Next page</a>
    <ul class="pagination-list">
      <li v-if="currentPage>2">
        <a :class="{'is-current':currentPage===1}"
           class="pagination-link"
           @click="toPage(1)">
          1
        </a>
      </li>
      <li v-if="currentPage>3">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <template v-for="page in totalPages">
        <li v-if="page>currentPage-2&&page<currentPage+2"
            :key="page">
          <a :class="{'is-current':currentPage===page}"
             class="pagination-link"
             @click="toPage(page)">
            {{ page }}
          </a>
        </li>
      </template>
      <li v-if="currentPage<totalPages-2">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="currentPage<totalPages-1">
        <a :class="{'is-current':currentPage===totalPages}"
           class="pagination-link"
           @click="toPage(totalPages)">
          {{ totalPages }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import vuexMappers from 'vuex'

export default {
  name: 'PaginationControl',
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      paginationInfo: 'paginationInfo',
      crumbs: 'crumbs',
    }),
    currentPage() {
      return this.paginationInfo.currentPage
    },
    totalPages() {
      return this.paginationInfo.totalPages
    },
    activeCategory() {
      return this.crumbs[this.crumbs.length - 1]
    },
    dynamicSizeClass() {
      let isFullhd = this.$mq === 'fullhd'
      let isWidescreen = this.$mq === 'widescreen'
      return {
        'is-small': !isFullhd && !isWidescreen,
        'is-medium': isFullhd || isWidescreen,
      }
    },
  },
  methods: {
    ...vuexMappers.mapActions('catalog', {
      getProductData: 'getProductData',
    }),
    nextPage() {
      return this.getProductData({
        node: this.activeCategory,
        page: this.currentPage + 1,
      })
    },
    previousPage() {
      return this.getProductData({
        node: this.activeCategory,
        page: this.currentPage - 1,
      })
    },
    toPage(pageNumber) {
      if (pageNumber !== this.currentPage) {
        return this.getProductData({
          node: this.activeCategory,
          page: pageNumber,
        })
      }
    },
  },
}
</script>
