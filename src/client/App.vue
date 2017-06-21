<template>
    <div id="app"
         class="container is-fluid">
        <div class="hero is-fullheight">
            <nav-bar></nav-bar>
            <router-view></router-view>
            <page-footer></page-footer>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import store from './store/store'
    import NavBar from './components/common/ui/navBar/NavBar.vue'
    import PageFooter from './components/common/ui/PageFooter.vue'

    export default {
        name: 'app',
        store: store,
        components: {
            NavBar,
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
            ...mapActions({})
        }
    }
</script>

<style>
    #app {
        overflow: hidden;
    }
</style>
