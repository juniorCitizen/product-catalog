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
        watch: {},
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
                switchMobileNavMode: 'switchMobileNavMode'
            }),
            ...mapActions({}),
            mobileNavToggle: function () {
                this.switchMobileNavMode(!this.mobileNavMode)
            }
        },
        mounted: function () { }
    }
</script>

<style scoped></style>
