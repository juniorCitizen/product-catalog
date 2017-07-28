<template>
    <div class="navbar-burger burger"
         :class="{'is-active': mobileNavMode}"
         data-target="navbarMenu"
         @click="mobileNavToggle">
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'navbar-burger',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({ mobileNavMode: 'mobileNavMode' })
        },
        methods: {
            ...mapMutations({ switchMobileNavMode: 'switchMobileNavMode' }),
            ...mapActions({}),
            mobileNavToggle: function () {
                this.switchMobileNavMode(!this.mobileNavMode)
            }
        }
    }
</script>

<style scoped></style>
