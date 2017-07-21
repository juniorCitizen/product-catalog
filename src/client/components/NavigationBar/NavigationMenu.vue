<template>
    <div class="navbar-end tabs is-right is-small">
        <ul>
            <li v-for="(menuItem, index) in menuItems"
                :key="index"
                style="padding:3px;"
                class="navbar-item"
                :class="{ 'is-active': $route.name === menuItem.viewName }">
                <router-link :to="menuItem.route">
                    <b>{{ menuItem.menuText }}</b>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'navigation-menu',
        components: {},
        props: [],
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
            ...mapGetters({
                currentView: 'currentView'
            })
        },
        watch: {
            '$route': function (to, from) {
                this.switchView(this.$route.name)
                this.currentView = this.$route.name
            }
        },
        methods: {
            ...mapMutations({
                switchView: 'switchView'
            }),
            ...mapActions({})
        },
        mounted: function () {
            this.switchView(this.$route.name)
            this.currentView = this.$route.name
        }
    }
</script>

<style scoped></style>
