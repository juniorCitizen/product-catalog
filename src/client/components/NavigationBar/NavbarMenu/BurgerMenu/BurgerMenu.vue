<template>
    <div class="navbar-start">
        <div v-for="menuItem in menuItems"
             :key="menuItem.viewName"
             class="navbar-item has-text-right"
             @click="mobileNavToggle">
            <router-link v-if="!(mobileNavMode && (menuItem.viewName === 'admin'))"
                         :to="menuItem.route"
                         :disabled="ajaxRequestPending">
                {{ menuItem.menuText }}
            </router-link>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'burger-menu',
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
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending',
                mobileNavMode: 'mobileNavMode'
            })
        },
        methods: {
            ...mapMutations({
                switchMobileNavMode: 'switchMobileNavMode',
                switchView: 'switchView'
            }),
            ...mapActions({}),
            mobileNavToggle: function () {
                this.switchMobileNavMode(!this.mobileNavMode)
            }
        },
        mounted: function () {
            this.switchView(this.$route.name)
        }
    }
</script>

<style scoped></style>
