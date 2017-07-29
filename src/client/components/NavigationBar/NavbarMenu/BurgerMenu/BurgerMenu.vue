<template>
    <div class="navbar-start">
        <div v-for="menuItem in routes"
             :key="menuItem.name"
             class="navbar-item has-text-right"
             @click="mobileNavToggle">
            <router-link v-if="!menuItem.redirect||(mobileNavMode&&!menuItem.menuText!=='admin')"
                         :to="menuItem.path"
                         :class="{ 'is-active': $route.name === menuItem.name }"
                         :disabled="ajaxRequestPending">
                <b>{{ menuItem.menuText }}</b>
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
            return {}
        },
        computed: {
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending',
                mobileNavMode: 'mobileNavMode',
                routes: 'routes'
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
