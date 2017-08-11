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
            ...mapGetters({
                currentView: 'currentView'
            })
        },
        methods: {
            ...mapMutations({
                switchMobileNavMode: 'switchMobileNavMode',
                switchView: 'switchView',
                registerWindowInnerWidth: 'registerWindowInnerWidth',
                registerWindowInnerHeight: 'registerWindowInnerHeight',
                registerClientWidth: 'registerClientWidth',
                registerClientHeight: 'registerClientHeight'
            }),
            ...mapActions({
                appInit: 'appInit'
            })
            // ,getWindowInnerWidth: function () {
            //     this.registerWindowInnerWidth((window.innerWidth || 0))
            // },
            // getWindowInnerHeight: function () {
            //     this.registerWindowInnerHeight((window.innerHeight || 0))
            // },
            // getClientWidth: function () {
            //     this.registerClientWidth(document.documentElement.clientWidth)
            // },
            // getClientHeight: function () {
            //     this.registerClientHeight(document.documentElement.clientHeight)
            // }
        },
        beforeCreate: function () { },
        created: function () {
            this.appInit()
        },
        beforeMount: function () { },
        mounted: function () {
            this.switchView(this.$route.name)
            // this.$nextTick(() => {
            //     window.addEventListener('resize', this.getWindowInnerWidth)
            //     window.addEventListener('resize', this.getWindowInnerHeight)
            //     window.addEventListener('resize', this.getClientWidth)
            //     window.addEventListener('resize', this.getClientHeight)
            //     this.getWindowInnerWidth()
            //     this.getWindowInnerHeight()
            //     this.getClientWidth()
            //     this.getClientHeight()
            // })
        },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () {
            // window.removeEventListener('resize', this.getWindowInnerWidth)
            // window.removeEventListener('resize', this.getWindowInnerHeight)
            // window.removeEventListener('resize', this.getClientWidth)
            // window.removeEventListener('resize', this.getClientHeight)
        },
        destroyed: function () { }
    }
</script>

<style scoped>
    /* div.container { overflow: show; } */


    /* div.hero { border: 1px solid red; overflow: hidden; } */
</style>
