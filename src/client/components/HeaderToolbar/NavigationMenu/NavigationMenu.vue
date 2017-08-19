<template>
    <v-toolbar-items class="hidden-sm-and-down">
        <navigation-item v-for="(route,index) in routes"
                         v-if="route.path!=='*'"
                         :key="route.name"
                         :routeIndex="index">
        </navigation-item>
    </v-toolbar-items>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import NavigationItem from './NavigationItem.vue'

    export default {
        name: 'navigation-menu',
        components: { NavigationItem },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({ routes: 'routes' })
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            next() {
                this.active = this.tabs[(this.tabs.indexOf(this.active) + 1) % this.tabs.length]
            }
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
