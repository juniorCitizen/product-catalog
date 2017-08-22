<template>
    <div class="navbar-end"
         :class="dynamicClasses">
        <ul>
            <toolbar-nav-tab v-for="(route,routeIndex) in routes"
                             v-if="routeAvailability(route)"
                             :key="route.name"
                             :routeIndex="routeIndex">
            </toolbar-nav-tab>
        </ul>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ToolbarNavTab from './ToolbarNavTab.vue'

    export default {
        name: 'toolbar-nav',
        components: {
            ToolbarNavTab
        },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                jwt: 'jwt',
                routes: 'routes'
            }),
            dynamicClasses: function () {
                return {
                    'tabs': !this.isMobile && !this.isTabletOnly,
                    'menu-list': this.isMobile || this.isTabletOnly
                }
            }
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            routeAvailability: function (route) {
                return (
                    (route.path !== '*') &&
                    !((route.name === 'login') && (this.jwt !== null)) &&
                    !((route.name === 'admin') && (this.jwt === null)) &&
                    !(
                        ((route.name === 'admin') || (route.name === 'login')) &&
                        (this.isMobile || this.isTabletOnly)
                    )
                )
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

<style scoped>
    ul {
        border: none;
    }
</style>
