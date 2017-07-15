<template>
    <div class="hero-body">
        <div class="container has-text-centered">
            <h4 class="subtitle is-4">
                <i class="fa fa-check-circle-o"></i>
                &nbsp;CHECK OFF FOR MORE INFORMATION
            </h4>
            <div id="card-container">
                <product-series v-for="seriesItem in prodSeries"
                                :key="seriesItem.id"
                                :activeItem="seriesItem.id === selectedSeries"
                                :productDataBySeries="filterProdDataBySeries(seriesItem.id)"
                                :seriesItem="seriesItem"
                                @seriesSelectionEvent="processSeriesSelection($event)">
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
            return {
                selectedSeries: null,
                fullProdData: []
            }
        },
        watch: {
            selectedSeries: function (newSeriesId) {
                this.getFullProdData()
                    .then((apiResponse) => {
                        this.seriesOverview = apiResponse.data.data
                    }).catch((error) => {
                        console.log(error)
                    })
            }
        },
        computed: {
            ...mapGetters({
                prodSeries: 'prodSeries'
            })
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({
                getProdSeriesList: 'getProdSeriesList',
                getFullProdData: 'getFullProdData'
            }),
            processSeriesSelection: function ($event) {
                if (this.selectedSeries !== $event) {
                    this.selectedSeries = $event
                } else {
                    this.selectedSeries = null
                }
            },
            filterProdDataBySeries: function (seriesId) {
                return this.fullProdData.filter((prodDataItem) => {
                    return prodDataItem.id === seriesId
                })[0]
            }
        },
        created: function () {
            this.getProdSeriesList()
            this.selectedSeries = 1
            this.getFullProdData()
                .then((apiResponse) => {
                    this.fullProdData = apiResponse.data.data
                }).catch((error) => {
                    console.log(error)
                })
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
