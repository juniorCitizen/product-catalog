<template>
    <li class="navbar-item"
        :class="liDynamicClass"
        :style="liDynamicStyle"
        @mouseenter="hover=true"
        @mouseleave="hover=false"
        @click="deactivateMobileNavMenu">
        <router-link :class="routerLinkDynamicClass"
                     :style="routerLinkDynamicStyle"
                     :to="routes[routeIndex].path">
            <b>{{ routes[routeIndex].caption }}</b>
        </router-link>
    </li>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'toolbar-nav-tab',
        components: {},
        props: ['routeIndex'],
        data: function () {
            return {
                hover: false
            }
        },
        computed: {
            ...mapGetters({
                routes: 'routes'
            }),
            isActiveRoute: function () {
                return this.$route.name === this.routes[this.routeIndex].name
            },
            routerLinkDynamicClass: function () {
                return {
                    'is-active': this.isActiveRoute
                }
            },
            routerLinkDynamicStyle: function () {
                if (!this.isOnMobileDevice && this.isActiveRoute) {
                    return {
                        'color': '#00d1b2',
                        'pointer-events': 'none',
                        'border-bottom-color': '#00d1b2',
                        'border-bottom-width': '2px'
                    }
                } else if (this.isActiveRoute) {
                    return {
                        'pointer-event': 'none',
                        'cursor': 'default'
                    }
                } else if (!this.isOnMobileDevice && !this.isActiveRoute && this.hover) {
                    return {
                        'color': '#00d1b2',
                        'border-bottom-color': '#00d1b2',
                        'border-bottom-width': '2px'
                    }
                } else if (this.isOnMobileDevice && !this.isActiveRoute && this.hover) {
                    return {
                        'color': '#00d1b2'
                    }
                }
            },
            liDynamicClass: function () {
                return {
                    'has-text-right': this.isOnMobileDevice
                }
            },
            liDynamicStyle: function () {
                if (!this.isOnMobileDevice) {
                    return {
                        'padding-left': '10px',
                        'padding-right': '10px'
                    }
                }
            }
        },
        watch: {},
        methods: {
            ...mapMutations({
                deactivateMobileNavMenu: 'deactivateMobileNavMenu'
            }),
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
