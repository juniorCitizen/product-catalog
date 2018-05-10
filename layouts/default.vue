<template>
  <div id="default-layout">
    <page-header/>
    <div id="page-content">
      <nuxt/>
    </div>
    <page-footer/>
    <in-progress v-if="isInProgress"/>
  </div>
</template>

<script>
import vuexMappers from 'vuex'
import PageHeader from '~/components/layouts/PageHeader'
import PageFooter from '~/components/layouts/PageFooter'
import InProgress from '~/components/layouts/InProgress'

export default {
  name: 'DefaultLayout',
  components: {
    PageHeader,
    PageFooter,
    InProgress,
  },
  computed: {
    ...vuexMappers.mapState('inProgress', {
      isInProgress: 'inProgress',
    }),
  },
}
</script>

<style scoped>
#default-layout {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: min-content auto min-content;
}

#page-content {
  grid-column: 1/-1;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
