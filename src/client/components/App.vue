<template>
    <div id="app">
        <header-toolbar></header-toolbar>
        <section class="hero">
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
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
