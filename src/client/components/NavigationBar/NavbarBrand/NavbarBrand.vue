<template>
    <div class="navbar-brand">
        <company-logo></company-logo>
        <navbar-burger></navbar-burger>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import CompanyLogo from './CompanyLogo/CompanyLogo.vue'
    import NavbarBurger from './NavbarBurger/NavbarBurger.vue'

    export default {
        name: 'navbar-brand',
        components: {
            CompanyLogo,
            NavbarBurger
        },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
