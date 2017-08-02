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
                console.log(`watcher: ${this.$route.name}`)
                this.switchView(this.$route.name)
                this.switchMobileNavMode(false)
            }
        },
        computed: {
            ...mapGetters({ currentView: 'currentView' })
        },
        methods: {
            ...mapMutations({
                switchMobileNavMode: 'switchMobileNavMode',
                switchView: 'switchView'
            }),
            ...mapActions({ appInit: 'appInit' })
        },
        beforeCreate: function () {
            // console.log(`beforeCreate: ${this.$route.name}`)
            // this.switchView(this.$route.name)
            // this.$router.push(this.$route.name)

        },
        created: function () {
            this.appInit()
            // console.log(`created: ${this.$route.name}`)
            // this.switchView(this.$route.name)
            // this.$router.push(this.$route.name)

        },
        beforeMount: function () {
            // console.log(`before mount: ${this.$route.name}`)
            // this.switchView(this.$route.name)
            // this.$router.push(this.$route.name)
        },
        mounted: function () {
            // console.log(`mounted: ${this.$route.name}`)
            this.switchView(this.$route.name)
            // this.$router.push(this.$route.name)
        },
        beforeUpdate: function () {
            // console.log(`beforeUpdate: ${this.$route.name}`)
            // this.switchView(this.$route.name)
            // this.$router.push(this.$route.name)

        },
        updated: function () {
            // console.log(`updated: ${this.$route.name}`)
            // this.switchView(this.$route.name)
            // this.$router.push(this.$route.name)

        },
        beforeDestroy: function () {
            // console.log(`beforeDestroy: ${this.$route.name}`)
            // this.switchView(this.$route.name)
            // this.$router.push(this.$route.name)

        },
        destroyed: function () {
            // console.log(`destroyed: ${this.$route.name}`)
            // this.switchView(this.$route.name)
            // this.$router.push(this.$route.name)

        }
    }
</script>

<style scoped>
    /* div.container { overflow: show; } */


    /* div.hero { border: 1px solid red; overflow: hidden; } */
</style>
