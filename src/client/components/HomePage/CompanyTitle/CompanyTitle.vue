<template>
    <h1 class="title is-spaced"
        :class="titleSize"
        :style="titleStyle">
        <strong class="taiwan-site content">
            <i>Gentry Way Co., Ltd.&nbsp;&</i>
        </strong>
        <br>
        <strong class="china-site content">
            <i>Gentry Hardware Products Co., Ltd.</i>
        </strong>
    </h1>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'company-title',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),
            titleSize: function () {
                return {
                    'is-1': this.isMediumAndUp,
                    'is-4': !this.isMediumAndUp
                }
            },
            titleStyle: function () {
                if (this.isLargeAndUp) {
                    return { transform: 'rotate(-4deg) scale(1.2, 1.6)' }
                } else if (this.isMediumOnly) {
                    return { transform: 'rotate(-4deg) scale(1.1, 1.1)' }
                } else {
                    return { transform: 'rotate(-4deg) scale(1.0, 1.0)' }
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
    .title {
        /* padding-top: 5%; */
        color: darkgreen;
        /* transform: rotate(-4deg) scale(1.0, 1.0); */
        /* transform: rotate(-4deg) translate(0px, -50px); */
    }
</style>
