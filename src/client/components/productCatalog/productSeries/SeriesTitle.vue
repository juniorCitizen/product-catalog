<template>
    <header class="card-header"
            :class="{'notification is-success is-paddingless':isActiveSeries}"
            @click="productSeriesSelection">
        <p class="card-header-title"
           :class="{'is-active':isActiveSeries, 'is-inactive':!isActiveSeries}">
            <i :style="{color: titleTextColor}">
                {{ productSeries.reference }} Series - {{ productCountInSeries }}
                <span v-if="productCountInSeries>1">Items</span>
                <span v-else>Item</span>
            </i>
        </p>
        <span v-if="productCountInSeries > 0"
              class="card-header-icon"
              :class="{'is-active':isActiveSeries, 'is-inactive':!isActiveSeries}">
            <span class="icon">
                <i v-show="!isActiveSeries"
                   class="fa fa-angle-down"></i>
                <i v-show="isActiveSeries"
                   class="fa fa-angle-up"></i>
            </span>
        </span>
    </header>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'series-title',
        components: {},
        props: [
            'isActiveSeries',
            'productSeries',
            'productCountInSeries'
        ],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),
            titleTextColor: function () {
                return this.isActiveSeries ? 'white' : 'green'
            }
        },
        methods: {
            ...mapMutations({ setActiveProductSeries: 'setActiveProductSeries' }),
            ...mapActions({}),
            productSeriesSelection: function () {
                if (!this.isActiveSeries) {
                    this.setActiveProductSeries(this.productSeries.id)
                } else {
                    this.setActiveProductSeries(null)
                }
            }
        }
    }
</script>

<style scoped>
    @keyframes activateTitle {
        0% {
            font-size: 14px;
            margin: 5px 0px 5px 12px;
            padding: 0px 0px 0px 0px;
            color: #126534;
        }
        100% {
            font-size: 30px;
            margin: 1px 0px 1px 12px;
            padding: 0px 0px 0px 0px;
            color: #126534;
        }
    }

    @keyframes deactivateTitle {
        0% {
            font-size: 30px;
            margin: 1px 0px 1px 12px;
            padding: 0px 0px 0px 0px;
            color: #126534;
        }
        100% {
            font-size: 14px;
            margin: 5px 0px 5px 12px;
            padding: 0px 0px 0px 0px;
            color: #126534;
        }
    }

    p.card-header-title.is-active {
        animation: activateTitle 0.3s both;
    }

    p.card-header-title.is-inactive {
        animation: deactivateTitle 0.3s both;
    }

    @keyframes activateIcon {
        0% {
            margin: 5px 12px 5px 0px;
            padding: 0px 0px 0px 0px;
        }
        100% {
            margin: 15px 0px 15px 0px;
        }
    }

    @keyframes deactivateIcon {
        0% {
            margin: 15px 0px 15px 0px;
        }
        100% {
            margin: 5px 12px 5px 0px;
            padding: 0px 0px 0px 0px;
        }
    }

    span.card-header-icon.is-active {
        animation: activateIcon 0.3s both;
    }

    span.card-header-icon.is-inactive {
        animation: deactivateIcon 0.3s both;
    }
</style>
