<template>
  <nav :class="dynamicSizeClass"
       class="breadcrumb is-centered">
    <ul>
      <crumb v-for="(crumb,index) in crumbs"
             :key="index"
             :class="{'is-active':index===crumbs.length-1}"
             :is-final-crumb="index===crumbs.length-1"
             :category="crumb">
        {{ crumb.name.toUpperCase() }}
      </crumb>
    </ul>
  </nav>
</template>

<script>
import vuexMappers from 'vuex'
import Crumb from './Crumb'

export default {
  name: 'Breadcrumbs',
  components: {Crumb},
  computed: {
    ...vuexMappers.mapGetters('catalog', {
      crumbs: 'crumbs',
    }),
    dynamicSizeClass() {
      if (!this.$mq) return {'is-small': true}
      let isFullhd = this.$mq === 'fullhd'
      let isWidescreen = this.$mq === 'widescreen'
      return {
        'is-small': !isFullhd && !isWidescreen,
        'is-medium': isFullhd || isWidescreen,
      }
    },
  },
}
</script>
