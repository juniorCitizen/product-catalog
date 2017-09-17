<template>
    <div class="hero-body">
        <div class="control">
            <div class="tags has-addons">
                <span v-if="!interestedProducts.length"
                      class="tag is-info"
                      :class="{'is-small':isMobile,'is-large':!isMobile}">
                    select items of interest
                </span>
                <span v-else
                      class="tag is-warning"
                      :class="{'is-small':isMobile,'is-large':!isMobile}">
                    <b>items of interest</b>
                </span>
                <span v-if="interestedProducts.length"
                      class="tag is-dark"
                      :class="{'is-small':isMobile,'is-large':!isMobile}">
                    <b>{{interestedProducts.length}}</b>
                </span>
            </div>
        </div>
        <div class="container is-fluid">
            <div class="columns is-centered">
                <div class="column box">
                    <div class="notification has-text-centered">
                        <div class="columns is-centered">
                            <span class="title"
                                  :class="{'is-6':isOnMobileDevice,'is-1':!isOnMobileDevice}">
                                PRODUCT CATALOG
                            </span>
                        </div>
                    </div>
                    <div class="card"
                         v-for="(seriesItem,seriesItemIndex) in series"
                         :key="seriesItemIndex">
                        <header class="card-header"
                                :class="{'is-active':seriesItem.id===activeSeriesId}"
                                @click="selectSeries(seriesItem.id)">
                            <p class="card-header-title">
                                <span :class="seriesTitleTextSize(seriesItem.id)"
                                      :style="{color:(activeSeriesId===seriesItem.id)?'white':'darkgreen'}">
                                    <i>{{seriesItem.reference.toUpperCase()}}</i>
                                    <i v-if="seriesItem.products.length">- {{seriesItem.products.length}} ITEM(S)</i>
                                </span>
                            </p>
                        </header>
                        <template v-if="(activeSeriesId===seriesItem.id)&&(seriesItem.products.length)">
                            <template v-if="!isMobile">
                                <desktop-product-viewer :products="seriesItem.products"
                                                        :interestedProducts="interestedProducts"
                                                        @selectProductEvent="selectProduct($event)">
                                </desktop-product-viewer>
                            </template>
                            <template v-else>
                                <mobile-product-viewer :products="seriesItem.products"
                                                       :interestedProducts="interestedProducts"
                                                       @selectProductEvent="selectProduct($event)">
                                </mobile-product-viewer>
                            </template>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <br>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import DesktopProductViewer from './DesktopProductViewer.vue'
    import MobileProductViewer from './MobileProductViewer.vue'

    export default {
        name: 'product-catalog',
        components: {
            DesktopProductViewer,
            MobileProductViewer
        },
        props: [],
        data: function () {
            return {
                activeSeriesId: 1,
                interestedProducts: []
            }
        },
        computed: {
            ...mapGetters({
                series: 'series/data',
                products: 'products/data'
            }),
            seriesTitleTextSize: function () {
                return (seriesId) => {
                    return {
                        'title is-2 is-active': (this.activeSeriesId === seriesId) && !this.isOnMobileDevice,
                        'title is-6 is-active': (this.activeSeriesId === seriesId) && this.isOnMobileDevice,
                        'title is-4': (this.activeSeriesId !== seriesId) && !this.isOnMobileDevice,
                        'title is-6': (this.activeSeriesId !== seriesId) && this.isOnMobileDevice
                    }
                }
            }
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            selectSeries: function (seriesId) {
                if (this.series[seriesId - 1].products.length > 0) {
                    this.visibleColumnIndex = 1
                    this.activeSeriesId = this.activeSeriesId === seriesId ? 0 : seriesId
                }
            },
            selectProduct: function (productId) {
                let interestedProductIndex = this.interestedProducts.findIndex((interestedProduct) => {
                    return interestedProduct === productId
                })
                if (interestedProductIndex === -1) {
                    this.interestedProducts.push(productId)
                } else {
                    this.interestedProducts.splice(interestedProductIndex, 1)
                }
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped>
    span.title,
    span.subtitle {
        font-style: italic;
        font-weight: bold;
        color: darkgreen;
    }

    header.card-header.is-active {
        background-color: darkorange;
    }

    header.card-header:hover .card-header-title {
        transform: scale(1.005);
    }

    div.control {
        position: fixed;
        bottom: 5%;
        right: 3%;
        cursor: pointer;
        z-index: 1000;
    }
</style>
