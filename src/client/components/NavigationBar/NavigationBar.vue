<template>
    <div class="hero-head">
        <header class="navbar">
            <div class="navbar-brand">
                <a class="navbar-item"
                   :href="hostUrl"
                   :disabled="ajaxRequestPending">
                    <img :src="logoUrl"
                         alt="Gentry Way Co., Ltd."
                         width="100"
                         height="25">
                </a>
                <h6 class="navbar-item subtitle is-6">
                    <i class="company-name-gw">GENTRY WAY CO., LTD.</i>
                    <i class="company-name-ghp">GENTRY HARDWARE PRODUCT CO., LTD.</i>
                </h6>
                <div class="navbar-burger burger"
                     :class="{'is-active':mobileNavActivated}"
                     data-target="navigation-menu"
                     @click="activateMobileNavMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div id="navigation-menu"
                 class="navbar-menu"
                 :class="{'is-active':mobileNavActivated}">
                <div class="navbar-start"></div>
                <navigation-menu></navigation-menu>
            </div>
        </header>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import eVars from '../../../server/config/environment'

    import NavigationMenu from './NavigationMenu.vue'

    export default {
        name: 'navigation-bar',
        props: [],
        components: {
            NavigationMenu
        },
        data: function () {
            return {
                hostUrl: `${eVars.HOST}:${eVars.PORT}`,
                logoUrl: `${eVars.HOST}:${eVars.PORT}/assets/images/gentryLogo.png`,
                mobileNavActivated: false
            }
        },
        computed: {
            ...mapGetters({
                currentView: 'currentView',
                ajaxRequestPending: 'ajaxRequestPending'
            })
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            activateMobileNavMenu: function () {
                this.mobileNavActivated = !this.mobileNavActivated
            }
        }
    }
</script>

<style scoped>
    a[disabled],
    a[disabled]:hover {
        pointer-events: none;
        color: #e1e1e1;
    }

    i.company-name-gw {
        transform: scale(0.8) translate(-30%, 10%);
    }

    i.company-name-ghp {
        transform: scale(0.8) translate(-94%, 110%);
    }
</style>
