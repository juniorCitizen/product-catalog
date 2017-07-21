<template>
    <div class="hero-body">
        <div class="container has-text-centered">
            <h4 class="subtitle is-4">
                <i class="fa fa-check-circle-o"></i>
                &nbsp;SELECT FOR MORE INFORMATION
            </h4>
            <div id="card-container">
                <product-series v-for="productSeries in productSeriesData"
                                :key="productSeries.id"
                                :productSeries="productSeries">
                </product-series>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductSeries from './productSeries/ProductSeries.vue'

    export default {
        name: 'product-catalog',
        components: { ProductSeries },
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({ productSeriesData: 'productSeriesData' })
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style lang="sass" scoped>
    div.hero-body {
        height: 530px;
        overflow: scroll;
        overflow-x: hidden;
    }
    div.container {
        margin: auto;
    }
    ::-webkit-scrollbar {
        width: 0px;  /* remove scrollbar space */
        background: transparent;  /* optional: just make scrollbar invisible */
    }
    /* optional: show position indicator in red */
    ::-webkit-scrollbar-thumb {
        background: #FF0000;
    }
</style>
