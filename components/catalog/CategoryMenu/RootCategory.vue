<template>
  <p :class="{'is-active': category.isActive}"
     class="menu-label"
     @click="$emit('clicked')">
    <span v-if="category.isActive"
          class="icon">
      <i class="fas fa-caret-up"/>
    </span>
    <span v-else
          class="icon">
      <i class="fas fa-caret-down"/>
    </span>
    <span class="root-menu-label">
      {{ category.name }}
    </span>
    <transition name="fade">
      <span v-show="category.isLoading"
            class="icon is-small">
        <i class="fas fa-spinner fa-pulse"/>
      </span>
    </transition>
  </p>
</template>

<script>
export default {
  name: 'RootCategory',
  props: {
    category: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>

<style scoped>
span {
  white-space: nowrap;
  cursor: default;
}

@media all and (max-width: 1087px) {
  span.root-menu-label {
    color: black;
    font-size: 70%;
    font-weight: 300;
  }
}

p.is-active > span:not(.icon),
p:not(.is-active):hover > span:not(.icon) {
  font-weight: 600;
  text-shadow: 1px 1px lightgray;
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
