<template>
    <div id="app"
         class="container">
        <div class="hero">
            <navigation-bar></navigation-bar>
            <router-view></router-view>
            <page-footer></page-footer>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import store from './store/store'

    import NavigationBar from './components/NavigationBar/NavigationBar.vue'
    import PageFooter from './components/PageFooter/PageFooter.vue'

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
                fetchCountryData: 'fetchCountryData',
                fetchRegionData: 'fetchRegionData'
            })
        },
        created: function () {
            this.fetchProductSeriesData()
            this.fetchProductCatalogData()
            this.fetchCountryData()
            this.fetchRegionData()
        }
    }
</script>

<style scoped>
    /* div.hero { overflow: hidden; } */
</style>
