<template>
    <v-list>
        <v-list-tile v-for="route in routes"
                     v-if="route.path!=='*'"
                     :key="route.name"
                     router
                     :to="route.path">
            <v-list-tile-action>
                <v-icon> {{ route.menuIcon }} </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ route.menuText }}</v-list-tile-content>
        </v-list-tile>
    </v-list>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'navigation-drawer-contents',
        components: {},
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
