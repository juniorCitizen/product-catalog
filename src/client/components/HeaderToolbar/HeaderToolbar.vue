<template>
    <v-toolbar fixed
               dark>
        <span class="hidden-md-and-up">
            <v-toolbar-side-icon @click.stop="$emit('toggleNavigationDrawer')">
            </v-toolbar-side-icon>
        </span>
        <v-toolbar-title>
            <router-link to="/productCatalog"
                         tag="span"
                         style="cursor:pointer;">
                Gentry Way Co., Ltd.
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <navigation-menu></navigation-menu>
    </v-toolbar>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import NavigationMenu from './NavigationMenu/NavigationMenu.vue'

    export default {
        name: 'header-toolbar',
        components: { NavigationMenu },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        watch: {},
        methods: {
            ...mapMutations({}),
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
