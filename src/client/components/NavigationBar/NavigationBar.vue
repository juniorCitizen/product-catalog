<template>
    <div class="hero-head">
        <header class="navbar">
            <div class="navbar-brand">
                <a class="navbar-item"
                   :href="hostUrl">
                    <img :src="logoUrl"
                         alt="Gentry Way Co., Ltd."
                         width="100"
                         height="25">
                </a>
                <h6 class="navbar-item subtitle is-6"
                    style="height: 100%;">
                    <i>GENTRY WAY CO., LTD.</i>
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
                currentView: 'currentView'
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

<style scoped></style>
