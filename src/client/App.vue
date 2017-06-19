<template>
    <div class="container is-fluid">
        <div id="app"
             class="hero is-medium">
            <nav-bar></nav-bar>
            <router-view></router-view>
            <pageFooter></pageFooter>
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
        data: () => {
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

<style></style>
