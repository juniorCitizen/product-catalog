<template>
    <div class="navbar-end tabs"
         :class="{'is-small':!isFullhd,'is-medium': isFullhd}">
        <ul>
            <li v-for="menuItem in menuItems"
                :key="menuItem.viewName"
                style="padding:3px;"
                class="navbar-item"
                :class="{ 'is-active': $route.name === menuItem.viewName }">
                <router-link :to="menuItem.route"
                             :class="{ 'is-active': $route.name === menuItem.viewName }"
                             :disabled="ajaxRequestPending">
                    <b>{{ menuItem.menuText }}</b>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'navbar-end',
        components: {},
        props: [],
        watch: {
            '$route': function (to, from) {
                this.switchView(this.$route.name)
            }
        },
        data: function () {
            return {
                menuItems: [{
                    menuText: 'HOME',
                    viewName: 'home',
                    route: '/'
                }, {
                    menuText: 'CATALOG',
                    viewName: 'products',
                    route: '/products'
                }, {
                    menuText: 'CONTACT US',
                    viewName: 'contacts',
                    route: '/contacts'
                }, {
                    menuText: 'ADMIN',
                    viewName: 'admin',
                    route: '/admin'
                }]
            }
        },
        computed: {
            ...mapGetters({ ajaxRequestPending: 'ajaxRequestPending' })
        },
        methods: {
            ...mapMutations({ switchView: 'switchView' }),
            ...mapActions({})
        },
        mounted: function () {
            this.switchView(this.$route.name)
        }
    }
</script>

<style scoped>
    /* a { font-size: 120%; } */


    /* a.is-active { pointer-events: none; border-bottom-width: 2px; } */


    /* a:hover:not(.is-active) { color: #00d1b2; border-bottom-color: #00d1b2; border-bottom-width: 2px; } */


    /* a[disabled], a[disabled]:hover { pointer-events: none; color: #e1e1e1; } */
</style>
