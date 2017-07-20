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

    import SeriesIndicator from './SeriesIndicator.vue'
    import SeriesTitle from './SeriesTitle.vue'
    import SeriesContents from './seriesContents/SeriesContents.vue'

    export default {
        name: 'product-series',
        components: {
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
        margin: 5px;
    }
</style>
