<template>
  <nuxt-link
    :to="routePath"
    :class="{'is-active':$route.name===routeName}"
    class="navbar-item"
    @click.native="$emit('routeChange')">
    {{ label }}
  </nuxt-link>
</template>

<script>
export default {
  name: 'RouteLink',
  props: {
    label: {
      type: String,
      default() {
        return 'HOME'
      },
    },
    routeName: {
      type: String,
      default() {
        return 'index'
      },
    },
    routePath: {
      type: String,
      default() {
        return '/'
      },
    },
  },
}
</script>
