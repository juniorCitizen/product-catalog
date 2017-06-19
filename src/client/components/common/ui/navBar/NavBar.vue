<template>
    <!-- Hero header: will stick at the top -->
    <div class="hero-head">
        <header class="nav has-shadow">
            <div class="nav-left">
                <a class="nav-item"
                   href="http://localhost">
                    <img src="http://localhost/assets/images/gentryLogo.png"
                         alt="Gentry logo"
                         width="100"
                         height="25">
                </a>
                <h5 class="title is-5 nav-item">
                    <strong>
                        <i>Gentry Way Co., Ltd.</i>
                    </strong>
                </h5>
            </div>
            <div class="nav-center">
                <h2 class="nav-item title is-2">
                    <i>
                        <b>
                            <u>{{ titleCaption }}</u>
                        </b>
                    </i>
                </h2>
            </div>
            <right-nav-menu></right-nav-menu>
        </header>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import RightNavMenu from './RightNavMenu.vue'

    export default {
        name: 'nav-bar',
        components: {
            RightNavMenu
        },
        data: () => {
            return {}
        },
        computed: {
            ...mapGetters({
                currentView: 'currentView'
            }),
            titleCaption: function () {
                let references = [{
                    routeName: 'home',
                    caption: ''
                }, {
                    routeName: 'products',
                    caption: 'OUR PRODUCTS'
                }, {
                    routeName: 'contacts',
                    caption: 'CONTACT US'
                }, {
                    routeName: 'admin',
                    caption: ''
                }]
                return references.filter((reference) => {
                    return reference.routeName === this.currentView
                })[0].caption
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
