<template>
    <div class="card">
        <header class="card-header"
                @click="selectCard">
            <p class="card-header-title"
               :class="{'is-active':activeItem, 'is-inactive':!activeItem}">
                <i>
                    {{ seriesItem.reference }} Series - {{ productsInSeries }}
                    <span v-if="productsInSeries>1">Items</span>
                    <span v-else>Item</span>
                </i>
            </p>
            <span class="card-header-icon"
                  :class="{'is-active':activeItem, 'is-inactive':!activeItem}">
                <span class="icon">
                    <i v-show="!activeItem"
                       class="fa fa-angle-down"
                       @click="activate"></i>
                    <i v-show="activeItem"
                       class="fa fa-angle-up"
                       @click="deactivate"></i>
                </span>
            </span>
        </header>
        <div class="card-content"
             v-if="activeItem && productsInSeries>0">
            <product-scroller :products="productDataBySeries.products"></product-scroller>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductScroller from './ProductScroller.vue'

    export default {
        name: 'product-series-card',
        components: { ProductScroller },
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
            productsInSeries: function () {
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
            deactivate: function () {
                this.$emit('deactivateSeriesCard', this.seriesItem.id)
            },
            activate: function () {
                this.$emit('activateSeriesCard', this.seriesItem.id)
            },
            selectCard: function () {
                this.$emit('cardSelected', this.seriesItem.id)
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
