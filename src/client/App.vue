<template>
    <div id="app"
         class="container is-fluid">
        <div class="hero is-fullheight">
            <navigation-bar :activeRouteName="activeRouteName"></navigation-bar>
            <router-view></router-view>
            <page-footer></page-footer>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import store from './store/store'
    import NavigationBar from './components/navigationBar/NavigationBar.vue'
    import PageFooter from './components/pageFooter/PageFooter.vue'

    export default {
        name: 'app',
        store: store,
        components: {
            NavigationBar,
            PageFooter
        },
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({
                fetchProductSeriesData: 'fetchProductSeriesData',
                fetchProductCatalogData: 'fetchProductCatalogData',
                fetchCountryData: 'fetchCountryData'
            })
        },
        created: function () {
            this.fetchProductSeriesData()
            this.fetchProductCatalogData()
            this.fetchCountryData()
        }
    }
</script>

<style scoped>
    div.hero {
        overflow: hidden;
    }
</style>
