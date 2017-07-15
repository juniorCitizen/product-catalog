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
                <h6 class="subtitle is-6 nav-item">
                    <i>GENTRY WAY CO., LTD.</i>
                </h6>
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
        props: [],
        components: {
            RightNavMenu
        },
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                currentView: 'currentView'
            })
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
