<template>
  <header id="page-header">
    <nav class="navbar is-light"
         role="navigation">
      <div class="navbar-brand">
        <company-logo/>
        <hamburger-button :is-active="mobileMenuIsActive"
                          @clicked="mobileMenuIsActive=!mobileMenuIsActive"/>
      </div>
      <navbar-menu :mobile-menu-is-active="mobileMenuIsActive"/>
    <!-- <nav-menu :is-active="mobileMenuIsActive"/> -->
    <!-- @routeChange="mobileMenuIsActive=false" -->
    </nav>
  </header>
</template>

<script>
import CompanyLogo from './CompanyLogo'
import HamburgerButton from './HamburgerButton'
import NavbarMenu from './NavbarMenu'

export default {
  name: 'PageHeader',
  components: {
    CompanyLogo,
    HamburgerButton,
    NavbarMenu,
  },
  data() {
    return {
      mobileMenuIsActive: false,
    }
  },
  watch: {
    $mq(newSize, prevSize) {
      let wasUnderLimit =
        prevSize === 'mobile' ||
        prevSize === 'tablet' ||
        prevSize === 'bulmaNavLimit'
      let isOverLimit =
        newSize === 'desktop' ||
        newSize === 'widescreen' ||
        newSize === 'fullhd'
      if (wasUnderLimit && isOverLimit) {
        this.mobileMenuIsActive = false
      }
    },
    $route() {
      this.mobileMenuIsActive = false
    },
  },
}
</script>
