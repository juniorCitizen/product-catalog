<template>
    <div id="navbarMenu"
         class="navbar-menu"
         :class="{'is-active': mobileNavMode}">
        <burger-menu v-if="mobileNavMode"></burger-menu>
        <navbar-end v-if="!mobileNavMode"></navbar-end>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import BurgerMenu from './BurgerMenu/BurgerMenu.vue'
    import NavbarEnd from './NavbarEnd/NavbarEnd.vue'

    export default {
        name: 'navbar-menu',
        components: {
            BurgerMenu,
            NavbarEnd
        },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({ mobileNavMode: 'mobileNavMode' })
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
