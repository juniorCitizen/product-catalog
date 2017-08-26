<template>
    <div class="hero-body">
        <div v-if="!isOnMobileDevice"
             class="container columns is-fluid">
            <span class="column is-narrow">
                <side-menu></side-menu>
            </span>
            <span class="column">
                product data form placeholder
            </span>
        </div>
        <div v-else
             class="columns is-centered">
            <div class="column has-text-centered">不支援行動裝置解析度</div>
            <div class="column has-text-centered">Mobile Device is Unsupported</div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import SideMenu from './SideMenu/SideMenu.vue'

    export default {
        name: 'admin-panel',
        components: {
            SideMenu
        },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                loggedInAsAdmin: 'loggedInAsAdmin'
            })
        },
        watch: {
            loggedInAsAdmin: function (loginStatus) {
                if (!loginStatus) {
                    this.$router.replace('/productCatalog/login')
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () {
            if (!this.loggedInAsAdmin) {
                this.$router.replace('/productCatalog/login')
            }
        },
        beforeUpdate: function () { },
        updated: function () {
            if (!this.loggedInAsAdmin) {
                this.$router.replace('/productCatalog/login')
            }
        },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
