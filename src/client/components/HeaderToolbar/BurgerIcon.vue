<template>
    <div class="navbar-burger burger"
         :class="{'is-active':mobileNavMenu}"
         @click="toggleMobileNavMenu"
         data-target="mobile=nav-menu">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'burger-icon',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({ mobileNavMenu: 'mobileNavMenu' })
        },
        watch: {},
        methods: {
            ...mapMutations({
                toggleMobileNavMenu: 'toggleMobileNavMenu'
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
