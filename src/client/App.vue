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
                switchView: 'switchView'
            }),
            ...mapActions({
                appInit: 'appInit'
            })
        },
        beforeCreate: function () { },
        created: function () {
            this.appInit()
        },
        beforeMount: function () { },
        mounted: function () {
            this.switchView(this.$route.name)
        },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped>
    /* div.container { overflow: show; } */


    /* div.hero { border: 1px solid red; overflow: hidden; } */
</style>
