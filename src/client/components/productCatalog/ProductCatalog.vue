<template>
    <div class="hero-body">
        <div class="container has-text-centered"
             style="margin:auto;">
            <div id="card-container">
                <product-series-card v-for="seriesItem in prodSeries"
                                     :key="seriesItem.id"
                                     :activeItem="seriesItem.id === selectedSeries"
                                     :seriesItem="seriesItem"
                                     :productDataBySeries="filterProdDataBySeries(seriesItem.id)"
                                     @deactivateSeriesCard="deactivateSeriesCard($event)"
                                     @activateSeriesCard="activateSeriesCard($event)"
                                     @cardSelected="processCardSelection($event)">
                </product-series-card>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductSeriesCard from './ProductSeriesCard.vue'

    export default {
        name: 'productCatalog',
        components: { ProductSeriesCard },
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
            deactivateSeriesCard: function ($event) {
                this.selectedSeries = null
            },
            activateSeriesCard: function ($event) {
                this.selectedSeries = $event
            },
            processCardSelection: function ($event) {
                if (this.selectedSeries !== $event) {
                    this.selectedSeries = $event
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
    ::-webkit-scrollbar {
        width: 0px;  /* remove scrollbar space */
        background: transparent;  /* optional: just make scrollbar invisible */
    }
    /* optional: show position indicator in red */
    ::-webkit-scrollbar-thumb {
        background: #FF0000;
    }
</style>
