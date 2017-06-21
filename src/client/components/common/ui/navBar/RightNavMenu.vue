<template>
    <div class="nav-right nav-menu">
        <a v-for="menuItem in menuItems"
           class="nav-item is-tab"
           :class="{ 'is-active': menuItem.viewName===currentView }">
            <router-link :to="menuItem.route">
                <b>{{ menuItem.menuText }}</b>
            </router-link>
        </a>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'right-nav-menu',
        components: {},
        data: function () {
            return {
                menuItems: [{
                    menuText: 'Home',
                    viewName: 'home',
                    route: '/'
                }, {
                    menuText: 'Catalog',
                    viewName: 'products',
                    route: '/products'
                }, {
                    menuText: 'Contact Us',
                    viewName: 'contacts',
                    route: '/contacts'
                }, {
                    menuText: 'Admin',
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
        mounted: function () {
            this.currentView = this.$router.name
        },
        watch: {
            '$route': function (to, from) {
                this.switchView(to.name)
            }
        },
        methods: {
            ...mapMutations({
                switchView: 'switchView'
            }),
            ...mapActions({}),
            isCurrentView: function (view) {
                return this.$router.name === view
            }
        }
    }
</script>

<style scoped></style>
