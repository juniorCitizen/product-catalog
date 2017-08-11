<template>
    <div class="hero-body">
        <div class="box has-text-centered">
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

<style scoped>
    div.hero-body {
        overflow: scroll;
        overflow-x: hidden;
    }

     ::-webkit-scrollbar {
        /* remove scrollbar space */
        width: 0px;
        /* optional: just make scrollbar invisible */
        background: transparent;
    }

     ::-webkit-scrollbar-thumb {
        /* optional: show position indicator in red */
        background: #FF0000;
    }
</style>
