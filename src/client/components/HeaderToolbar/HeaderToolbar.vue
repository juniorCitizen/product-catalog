<template>
    <header id="header-toolbar"
            class="navbar is-transparent">
        <div class="navbar-brand">
            <logo></logo>
            <company-title></company-title>
            <burger-icon></burger-icon>
        </div>
        <div id="mobile-nav-menu"
             class="navbar-menu"
             :class="dynamicClasses">
            <toolbar-nav></toolbar-nav>
        </div>
    </header>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import BurgerIcon from './BurgerIcon.vue'
    import CompanyTitle from './CompanyTitle.vue'
    import Logo from './Logo.vue'
    import ToolbarNav from './ToolbarNav.vue'

    export default {
        name: 'header-toolbar',
        components: {
            BurgerIcon,
            CompanyTitle,
            Logo,
            ToolbarNav
        },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                clientAccessUrl: 'clientAccessUrl',
                mobileNavMenu: 'mobileNavMenu'
            }),
            logoUrl: function () {
                return `${this.clientAccessUrl}/assets/gentryLogoSmall.png`
            },
            dynamicClasses: function () {
                return {
                    'is-active': (this.isMobile || this.isTabletOnly) && this.mobileNavMenu
                }
            }
        },
        watch: {},
        methods: {
            ...mapMutations({
                registerHeaderToolbarHeight: 'registerHeaderToolbarHeight'
            }),
            ...mapActions({}),
            updateHeaderToolbarHeight: function () {
                this.registerHeaderToolbarHeight(document.getElementById('header-toolbar').clientHeight)
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () {
            this.updateHeaderToolbarHeight()
        },
        beforeUpdate: function () { },
        updated: function () {
            this.updateHeaderToolbarHeight()
        },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped>
    header {
        position: fixed;
        width: 100%;
        top: 0;
        overflow-y: hidden;
        overflow-x: hidden;
        z-index: 1;
    }

    a {
        cursor: pointer;
    }

    a[disabled],
    a[disabled]:hover {
        pointer-events: none;
    }
</style>
