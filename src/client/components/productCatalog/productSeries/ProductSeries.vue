<template>
    <div class="card">
        <series-title :isActiveSeries="isActiveSeries"
                      :productSeries="productSeries"
                      :productCountInSeries="productCountInSeries">
        </series-title>
        <series-contents v-if="productCountInSeries > 0"
                         :isActiveSeries="isActiveSeries"
                         :products="productsInSeries.products">
        </series-contents>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import SeriesTitle from './SeriesTitle.vue'
    import SeriesContents from './seriesContents/SeriesContents.vue'

    export default {
        name: 'product-series',
        components: {
            SeriesContents,
            SeriesTitle
        },
        props: ['productSeries'],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                activeProductSeriesId: 'activeProductSeriesId',
                productCatalogData: 'productCatalogData'
            }),
            isActiveSeries: function () {
                return this.productSeries.id === this.activeProductSeriesId
            },
            productsInSeries: function () {
                return this.productCatalogData.filter((productCatalogDataInSeries) => {
                    return productCatalogDataInSeries.id === this.productSeries.id
                })[0]
            },
            productCountInSeries: function () {
                if (this.productsInSeries) {
                    return this.productsInSeries.products.length
                } else {
                    return 0
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
    div.card {
        margin: 5px;
    }
</style>
