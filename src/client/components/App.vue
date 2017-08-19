<template>
    <div id="app">
        <v-app>
            <v-navigation-drawer v-model="navDrawerActivated"
                                 temporary>
                <navigation-drawer-contents></navigation-drawer-contents>
            </v-navigation-drawer>
            <header-toolbar @toggleNavigationDrawer="navDrawerActivated=!navDrawerActivated">
            </header-toolbar>
            <main>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </main>
            <footer-toolbar></footer-toolbar>
        </v-app>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import HeaderToolbar from './HeaderToolbar/HeaderToolbar.vue'
    import FooterToolbar from './FooterToolbar/FooterToolbar.vue'
    import NavigationDrawerContents from './NavigationDrawContents/NavigationDrawerContents.vue'

    export default {
        name: 'app',
        components: {
            HeaderToolbar,
            FooterToolbar,
            NavigationDrawerContents
        },
        props: [],
        data: function () {
            return {
                navDrawerActivated: false
            }
        },
        computed: {
            ...mapGetters({})
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({ appInit: 'appInit' })
        },
        beforeCreate: function () { },
        created: function () {
            this.appInit()
        },
        beforeMount: function () { },
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
