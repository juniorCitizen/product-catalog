<template>
    <div class="card">
        <header class="card-header"
                @click="seriesSelected">
            <series-title :activeItem="activeItem"
                          :seriesItem="seriesItem"
                          :seriesProductCount="seriesProductCount">
            </series-title>
            <series-indicator v-if="seriesProductCount>0"
                              :activeItem="activeItem">
            </series-indicator>
        </header>
        <series-contents v-if="seriesProductCount>0"
                         :activeItem="activeItem"
                         :products="productDataBySeries.products">
        </series-contents>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductScroller from './ProductScroller.vue'
    import SeriesContents from './SeriesContents.vue'
    import SeriesIndicator from './SeriesIndicator.vue'
    import SeriesTitle from './SeriesTitle.vue'

    export default {
        name: 'product-series',
        components: {
            ProductScroller,
            SeriesContents,
            SeriesIndicator,
            SeriesTitle
        },
        props: [
            'activeItem',
            'seriesItem',
            'productDataBySeries'
        ],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),
            seriesProductCount: function () {
                if (this.productDataBySeries) {
                    return this.productDataBySeries.products.length
                } else {
                    return 0
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            seriesSelected: function () {
                this.$emit('seriesSelectionEvent', this.seriesItem.id)
            }
        }
    }
</script>

<style lang="sass" scoped>
    div.card {
        margin:5px;
    }
    p.card-header-title.is-active {
        font-size: 30px;
        margin: 1px 0px 1px 12px;
        padding: 0px 0px 0px 0px;
        color: #126534;
    }
    a.card-header-icon.is-active {
        margin: 1px 0px 1px 0px;
    }
    p.card-header-title.is-inactive {
        font-size: 14px;
        margin: 5px 0px 5px 12px;
        padding: 0px 0px 0px 0px;
        color: #126534;
    }
    a.card-header-icon.is-inactive {
        margin: 5px 12px 5px 0px;
        padding: 0px 0px 0px 0px;
    }
</style>
