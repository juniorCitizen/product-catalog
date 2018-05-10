<template>
  <div id="navbar-start"
       class="navbar-start">
    <nuxt-link
      :class="{'is-active':$route.name==='index'}"
      class="navbar-item"
      to="/"
      tag="a"
      @click.native="startInProgressAnimation">
      <span>HOME</span>
    </nuxt-link>
    <nuxt-link v-if="$route.name!=='catalog'"
               :class="{'is-active':$route.name==='catalog'}"
               class="navbar-item"
               to="/catalog"
               tag="a"
               @click.native="startInProgressAnimation">
      <span>CATALOG</span>
    </nuxt-link>
    <nuxt-link v-else
               :class="{'is-active':$route.name==='catalog'}"
               class="navbar-item has-dropdown"
               to="/catalog"
               tag="a"
               @click.native="startInProgressAnimation">
      <a class="navbar-link">CATALOG</a>
      <div class="navbar-dropdown">
        <div class="navbar-item">
          Version 0.7.1
        </div>
      </div>
    </nuxt-link>
    <nuxt-link
      :class="{'is-active':$route.name==='contact'}"
      class="navbar-item"
      to="/contact"
      tag="a"
      @click.native="startInProgressAnimation">
      <span>CONTACT</span>
    </nuxt-link>
  </div>
</template>

<script>
import vuexMappers from 'vuex'

export default {
  name: 'NavbarStart',
  methods: {
    ...vuexMappers.mapMutations('inProgress', {
      startInProgressAnimation: 'startInProgressAnimation',
    }),
  },
}
</script>

<style scoped>
@media all and (min-width: 1088px) {
  #navbar-start {
    display: none;
  }
}

a.is-active {
  pointer-events: none;
}
</style>
