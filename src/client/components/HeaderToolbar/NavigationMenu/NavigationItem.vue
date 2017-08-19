<template>
    <v-btn flat
           router
           :to="routes[routeIndex].path">
        <v-icon left>
            {{routes[routeIndex].menuIcon}}
        </v-icon>
        {{ routes[routeIndex].name }}
    </v-btn>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'navigation-item',
        components: {},
        props: ['routeIndex'],
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
