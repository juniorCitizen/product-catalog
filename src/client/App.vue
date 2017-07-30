<template>
    <div id="app"
         class="container is-marginless">
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
        watch: {
            isTouch: function (isTouchStatus) {
                this.switchMobileNavMode(false)
            },
            '$route': function (to, from) {
                this.switchView(this.$route.name)
                this.switchMobileNavMode(false)
            }
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({
                switchMobileNavMode: 'switchMobileNavMode',
                switchView: 'switchView',
                updateUserData: 'updateUserData'
            }),
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
        },
        mounted: function () {
            this.updateUserData({
                company: 'Gentry Way Co., Ltd.',
                name: 'Chia-Yu Tsai',
                email: 'david.tsai@gentry-way.com.tw',
                comments: `firstline
第二行

skipped to the fourthline`
            })
            this.switchView(this.$route.name)
        }
    }
</script>

<style scoped>
    /* div.container { overflow: show; } */


    /* div.hero { border: 1px solid red; overflow: hidden; } */
</style>
