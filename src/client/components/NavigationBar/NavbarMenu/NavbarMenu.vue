<template>
    <div id="navbarMenu"
         class="navbar-menu"
         :class="{'is-active': mobileNavMode}">
        <navbar-end></navbar-end>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import NavbarEnd from './NavbarEnd/NavbarEnd.vue'

    export default {
        name: 'navbar-menu',
        components: { NavbarEnd },
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
