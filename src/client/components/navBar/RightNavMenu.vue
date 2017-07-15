<template>
    <div class="nav-right nav-menu">
        <a v-for="(menuItem, index) in menuItems"
           :key="index"
           class="nav-item is-tab"
           :class="{ 'is-active': $route.name === menuItem.viewName }">
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
        props: [],
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
