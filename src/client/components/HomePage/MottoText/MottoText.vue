<template>
    <span>
        <h3 class="subtitle"
            :class="subtitleSize">
            <i>Quality aluminium extrusion articles</i>
            <br>
            <i>for medical, rehabilitation and recreation industries</i>
            <br>
            <i>at competitive prices !!!</i>
            <br>
        </h3>
        <h4 class="subtitle"
            :class="subtitleMinorSize">
            <i>Products available from Taiwan or China</i>
        </h4>
    </span>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'motto-text',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),
            subtitleSize: function () {
                return {
                    'is-2': this.isFullhd,
                    'is-3': !this.isFullhd && !this.isMobile,
                    'is-5': this.isMobile
                }
            },
            subtitleMinorSize: function () {
                return {
                    'is-3': this.isFullhd,
                    'is-4': !this.isFullhd && !this.isMobile,
                    'is-6': this.isMobile
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
    .subtitle {
        transform: rotate(-4deg);
        /* overflow: visible; transform: rotate(-4deg) translate(0px, -50px); */
    }
</style>
