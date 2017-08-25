<template>
    <div class="hero-body">
        <div class="container is-fluid has-text-centered">
            <div class="tile is-ancestor">
                <div class="tile is-parent is-vertical">
                    <div class="tile is-child">
                        <head-lines></head-lines>
                    </div>
                    <div class="tile is-child">
                        <subheadings></subheadings>
                    </div>
                    <div class="tile is-child">
                        <caption-text></caption-text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import HeadLines from './HeadLines.vue'
    import Subheadings from './Subheadings.vue'
    import CaptionText from './CaptionText.vue'

    export default {
        name: 'home-page',
        components: {
            HeadLines,
            Subheadings,
            CaptionText
        },
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                windowsInnerWidth: 'windowsInnerWidth',
                windowsInnerHeight: 'windowsInnerHeight',
                clientWidth: 'clientWidth',
                clientHeight: 'clientHeight',
                headerToolbarHeight: 'headerToolbarHeight',
                pageFooterHeight: 'pageFooterHeight'
            })
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

<style scoped>
    div.hero-body {
        z-index: 0;
        animation: animate 0.8s both;
    }

    @keyframes animate {
        0% {
            transform: scale(0.6) translateY(120px);
        }
        100% {
            transform: scale(1) translateY(0px);
        }
    }
</style>
