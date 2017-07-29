<template>
    <div class="navbar-end"
         :class="{'is-small':!isFullhd,'is-medium': isFullhd, 'tabs': !isTouch}">
        <ul>
            <template v-for="(navRoute, index) in routes">
                <nav-menu-item v-if="navRoute.path!=='*'"
                               :key="navRoute.index"
                               :navRoute="navRoute">
                </nav-menu-item>
            </template>
        </ul>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import NavMenuItem from './NavMenuItem/NavMenuItem.vue'

    export default {
        name: 'navbar-end',
        components: { NavMenuItem },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({ routes: 'routes' })
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
