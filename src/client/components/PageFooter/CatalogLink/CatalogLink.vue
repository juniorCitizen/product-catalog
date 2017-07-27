<template>
    <router-link class="button is-success"
                 to="/products"
                 :style="fontStyle">
        CLICK TO SEE OUR PRODUCTS
    </router-link>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'catalog-link',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),
            fontStyle: function () {
                if (this.isLargeAndUp) {
                    return { 'font-size': '90%' }
                } else {
                    return {
                        'padding-top': '0px',
                        'font-size': '75%',
                        'padding-bottom': '0px'
                    }
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
    .button {
        font-weight: bolder;
        font-style: italic;
        transform: scale(2, 2);
        position: absolute;
        bottom: -40px;
        width: 100%;
        border: none;
    }
</style>
