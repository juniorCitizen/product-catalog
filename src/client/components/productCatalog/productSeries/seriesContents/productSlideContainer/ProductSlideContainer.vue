<template>
    <span class="product-slide-container column columns is-marginless is-paddingless">
        <div v-for="product of productList"
             :key="products[product.productIndexInSeries].id"
             class="column is-3 is-marginless"
             :class="{'slide-left': slideLeft && products.length>productList.length, 'slide-right': slideRight && products.length>productList.length}">
            <div class="img-container is-paddingless">
                <interest-mark :product="products[product.productIndexInSeries]">
                </interest-mark>
                <a @click="callProductModal(product.productIndexInSeries)">
                    <img class="image"
                         :src="product.imagePath"
                         :alt="product.itemCode">
                </a>
                <h2>
                    <span>{{ product.itemCode }}</span>
                </h2>
            </div>
        </div>
        <product-detail-modal v-if="productIndexInModalView !== null"
                              :product="products[productIndexInModalView]"
                              @closingModal="callProductModal(null)">
        </product-detail-modal>
    </span>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import InterestMark from './InterestMark.vue'
    import ProductDetailModal from './productDetailModal/ProductDetailModal.vue'

    export default {
        name: 'product-slide-container',
        components: {
            InterestMark,
            ProductDetailModal
        },
        props: [
            'products',
            'slideLeft',
            'slideRight'
        ],
        watch: {
            slideLeft: function (activated) {
                if (activated) {
                    if (this.products.length > this.displayCount) {
                        this.productList.push(this.nextProductWaitingOnRight)
                        setTimeout(() => {
                            this.productList.splice(0, 1)
                            this.$emit('slidingAnimationCompleted')
                        }, 330)
                    }
                }
            },
            slideRight: function (activated) {
                if (activated) {
                    if (this.products.length > this.displayCount) {
                        this.productList.splice(0, 0, this.nextProductWaitingOnLeft)
                        setTimeout(() => {
                            this.productList.splice(this.displayCount, 1)
                            this.$emit('slidingAnimationCompleted')
                        }, 330)
                    }
                }
            }
        },
        data: function () {
            return {
                host: this.$eVars.HOST,
                port: this.$eVars.PORT,
                sysRef: this.$eVars.SYS_REF,
                displayCount: 4,
                productList: [],
                productIndexInModalView: null
            }
        },
        computed: {
            ...mapGetters({}),
            nextProductWaitingOnLeft: function () {
                if (this.products.length <= this.displayCount) {
                    return null
                } else {
                    let slideInProductIndex = this.productList[0].productIndexInSeries === 0 ? (this.products.length - 1) : (this.productList[0].productIndexInSeries - 1)
                    return {
                        imagePath: `${this.host}:${this.port}/${this.sysRef}/api/photos?photoId=${this.products[slideInProductIndex].photos[0].id}`,
                        itemCode: this.products[slideInProductIndex].itemCode,
                        productIndexInSeries: slideInProductIndex
                    }
                }
            },
            nextProductWaitingOnRight: function () {
                if (this.products.length <= this.displayCount) {
                    return null
                } else {
                    let slideInProductIndex = this.productList[(this.displayCount - 1)].productIndexInSeries < (this.products.length - 1) ? (this.productList[(this.displayCount - 1)].productIndexInSeries + 1) : 0
                    return {
                        imagePath: `${this.host}:${this.port}/${this.sysRef}/api/photos?photoId=${this.products[slideInProductIndex].photos[0].id}`,
                        itemCode: this.products[slideInProductIndex].itemCode,
                        productIndexInSeries: slideInProductIndex
                    }
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            callProductModal: function (productIndexInSeries) {
                this.productIndexInModalView = productIndexInSeries
            }
        },
        beforeMount: function () {
            for (let productIndex = 0; productIndex < this.displayCount; productIndex++) {
                if (productIndex < (this.products.length)) {
                    this.productList.push({
                        imagePath: `${this.host}:${this.port}/${this.sysRef}/api/photos?photoId=${this.products[productIndex].photos[0].id}`,
                        itemCode: this.products[productIndex].itemCode,
                        productIndexInSeries: productIndex
                    })
                }
            }
        }
    }
</script>

<style scoped>
    span.product-slide-container {
        overflow-x: hidden;
    }

    div.slide-left {
        animation: slideLeft 0.3s both;
    }

    @keyframes slideLeft {
        0% {
            transform: translateX(0%);
        }
        100% {
            transform: translateX(-100%);
        }
    }

    div.slide-right {
        animation: slideRight 0.3s both;
    }

    @keyframes slideRight {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(0%);
        }
    }

    .img-container {
        position: relative;
        border: none;
        height: 250px;
    }

    img.image {
        margin-top: 10px;
        height: 200px;
        border: none;
        border-radius: 12px;
        transition: transform 0.6s;
    }

    img.image:hover {
        transform: scale(1.1);
    }

    h2 {
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        margin: 0px;
    }

    h2 span {
        color: white;
        font: italic 14px/25px Helvetica, Sans-Serif;
        padding: 3px 8px 3px 5px;
        background: rgb(0, 0, 0);
        background: rgba(0, 0, 0, 0.3);
    }
</style>
