<template>
    <div id="app">
        <header-toolbar></header-toolbar>
        <section class="hero"
                 :class="{'is-fullheight':vCentered}"
                 :style="dynamicStyles">
            <router-view></router-view>
        </section>
        <page-footer></page-footer>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import store from '../store/store'
    import HeaderToolbar from './HeaderToolbar/HeaderToolbar.vue'
    import PageFooter from './PageFooter/PageFooter.vue'

    export default {
        name: 'app',
        store: store,
        components: {
            HeaderToolbar,
            PageFooter
        },
        props: [],
        data: function () {
            return {
                vCentered: false
            }
        },
        computed: {
            ...mapGetters({
                headerToolbarHeight: 'headerToolbarHeight',
                pageFooterHeight: 'pageFooterHeight',
                // windowsInnerWidth: 'windowsInnerWidth',
                // windowsInnerHeight: 'windowsInnerHeight',
                clientWidth: 'clientWidth',
                clientHeight: 'clientHeight',
                mobileNavMenu: 'mobileNavMenu',
                routes: 'routes'
            }),
            dynamicStyles: function () {
                return !this.vCentered ? { 'margin-top': this.headerToolbarHeight + 1 + 'px' } : {}
            }
        },
        watch: {
            '$route': function (to, from) {
                this.vCentered = this.routes.filter((route) => {
                    return route.name === to.name
                })[0].vCentered
            },
            'isTabletOnly': function (state) {
                if (!state && this.isDesktop && this.mobileNavMenu) {
                    this.deactivateMobileNavMenu()
                }
            }
        },
        methods: {
            ...mapMutations({
                // registerWindowInnerWidth: 'registerWindowInnerWidth',
                // registerWindowInnerHeight: 'registerWindowInnerHeight',
                deactivateMobileNavMenu: 'deactivateMobileNavMenu',
                registerClientWidth: 'registerClientWidth',
                registerClientHeight: 'registerClientHeight'
            }),
            ...mapActions({ appInit: 'appInit' }),
            // getWindowInnerWidth: function () {
            //     this.registerWindowInnerWidth((window.innerWidth || 0))
            // },
            // getWindowInnerHeight: function () {
            //     this.registerWindowInnerHeight((window.innerHeight || 0))
            // },
            getClientWidth: function () {
                this.registerClientWidth(document.documentElement.clientWidth)
            },
            getClientHeight: function () {
                this.registerClientHeight(document.documentElement.clientHeight)
            }
        },
        beforeCreate: function () { },
        created: function () {
            this.appInit()
        },
        beforeMount: function () { },
        mounted: function () {
            this.vCentered = this.routes.filter((route) => {
                return route.name === this.$route.name
            })[0].vCentered
            this.$nextTick(() => {
                // window.addEventListener('resize', this.getWindowInnerWidth)
                // window.addEventListener('resize', this.getWindowInnerHeight)
                window.addEventListener('resize', this.getClientWidth)
                window.addEventListener('resize', this.getClientHeight)
                // this.getWindowInnerWidth()
                // this.getWindowInnerHeight()
                this.getClientWidth()
                this.getClientHeight()
            })
        },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () {
            // window.removeEventListener('resize', this.getWindowInnerWidth)
            // window.removeEventListener('resize', this.getWindowInnerHeight)
            window.removeEventListener('resize', this.getClientWidth)
            window.removeEventListener('resize', this.getClientHeight)
        },
        destroyed: function () { }
    }
</script>

<style scoped>
    section.hero {
        z-index: 0;
    }
</style>
