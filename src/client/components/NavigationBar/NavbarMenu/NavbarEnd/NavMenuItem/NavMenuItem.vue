<template>
    <li v-if="!((navRoute.name==='admin') && (isTouch))"
        class="navbar-item"
        :class="{'has-text-right': isTouch}">
        <router-link :to="navRoute.path"
                     :class="dynamicClasses"
                     :disabled="ajaxRequestPending">
            <b>{{ navRoute.menuText }}</b>
        </router-link>
    </li>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'nav-menu-item',
        components: {},
        props: ['navRoute'],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending',
                mobileNavMode: 'mobileNavMode'
            }),
            dynamicClasses: function () {
                return {
                    'is-active': this.$route.name === this.navRoute.name,
                    'mobile-nav-mode': this.isTouch
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped>
    a.is-active:not(.mobile-nav-mode) {
        color: #00d1b2;
        pointer-events: none;
        border-bottom-color: #00d1b2;
        border-bottom-width: 2px;
    }

    a.mobile-nav-mode.is-active {
        color: #00d1b2;
        pointer-events: none;
    }

    a.mobile-nav-mode:not(.is-active) {
        color: black;
    }

    a.mobile-nav-mode:not(.is-active):hover {
        color: #00d1b2;
    }

    a:hover:not(.is-active) {
        color: #00d1b2;
        border-bottom-color: #00d1b2;
        border-bottom-width: 2px;
    }

    a[disabled],
    a[disabled]:hover {
        pointer-events: none;
        color: #e1e1e1;
    }
</style>
