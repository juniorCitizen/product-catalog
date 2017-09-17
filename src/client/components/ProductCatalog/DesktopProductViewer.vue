<template>
    <div class="card-content">
        <div class="content columns"
             :style="{height:height+'px'}">
            <div class="cycle-control column is-narrow"
                 @click="enterFromRight=true">
                <span class="icon is-large">
                    <i class="fa fa-chevron-circle-left"></i>
                </span>
            </div>
            <v-touch :style="swiperStyles"
                     @swipeleft.capture="enterFromRight=true"
                     @swiperight.capture="enterFromLeft=true">
                <div id="product-set-frame"
                     class="column">
                    <div id="product-set-wrapper"
                         :style="{left:photoSetLeftPosition+'px'}">
                        <div class="product-set"
                             :style="{width:(productSetFrameWidth)+'px'}">
                            <template v-for="(product,productIndex) in previousProductSet">
                                <div class="product-wrapper"
                                     v-if="product.id"
                                     :key="productIndex"
                                     :style="backgroundImage(`${$eVars.API_URL}/photos?photoId=${product.photos[0].id}`)">
                                    <div class="product-code">
                                        ({{(previousColumnIndex*productsPerRow)+productIndex+1}}) {{product.code}}
                                    </div>
                                    <div class="selection-marker"
                                         :style="isProductOfInterest(product.id)"
                                         @click="$emit('selectProductEvent',product.id)">
                                        <span class="icon is-medium">
                                            <i class="fa fa-check-circle"></i>
                                        </span>
                                    </div>
                                </div>
                                <div v-else
                                     class="product-wrapper placeholder"
                                     :style="{width:(1/productsPerRow*100-0.5)+'%'}"
                                     :key="productIndex">
                                </div>
                            </template>
                        </div>
                        <div class="product-set"
                             :style="{width:(productSetFrameWidth)+'px'}">
                            <template v-for="(product,productIndex) in visibleProductSet">
                                <div class="product-wrapper"
                                     v-if="product.id"
                                     :key="productIndex"
                                     :style="backgroundImage(`${$eVars.API_URL}/photos?photoId=${product.photos[0].id}`)">
                                    <div class="product-code">
                                        ({{(visibleColumnIndex*productsPerRow)+productIndex+1}}) {{product.code}}
                                    </div>
                                    <div class="selection-marker"
                                         :style="isProductOfInterest(product.id)"
                                         @click="$emit('selectProductEvent',product.id)">
                                        <span class="icon is-medium">
                                            <i class="fa fa-check-circle"></i>
                                        </span>
                                    </div>
                                </div>
                                <div v-else
                                     class="product-wrapper placeholder"
                                     :style="{width:(1/productsPerRow*100-0.5)+'%'}"
                                     :key="productIndex">
                                </div>
                            </template>
                        </div>
                        <div class="product-set"
                             :style="{width:(productSetFrameWidth)+'px'}">
                            <template v-for="(product,productIndex) in nextProductSet">
                                <div class="product-wrapper"
                                     v-if="product.id"
                                     :key="productIndex"
                                     :style="backgroundImage(`${$eVars.API_URL}/photos?photoId=${product.photos[0].id}`)">
                                    <div class="product-code">
                                        ({{(visibleColumnIndex*productsPerRow)+productIndex+1}}) {{product.code}}
                                    </div>
                                    <div class="selection-marker"
                                         :style="isProductOfInterest(product.id)"
                                         @click="$emit('selectProductEvent',product.id)">
                                        <span class="icon is-medium">
                                            <i class="fa fa-check-circle"></i>
                                        </span>
                                    </div>
                                </div>
                                <div v-else
                                     class="product-wrapper placeholder"
                                     :style="{width:(1/productsPerRow*100-0.5)+'%'}"
                                     :key="productIndex">
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </v-touch>
            <div class="cycle-control column is-narrow"
                 @click="enterFromLeft=true">
                <span class="icon is-large">
                    <i class="fa fa-chevron-circle-right"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'desktop-product-viewer',
        components: {},
        props: [
            'products',
            'interestedProducts'
        ],
        data: function () {
            return {
                height: 350,
                productsPerRow: 4,
                visibleColumnIndex: 0,
                enterFromLeft: false,
                enterFromRight: false,
                productSetFrameWidth: 0,
                photoSetLeftPosition: 0
            }
        },
        computed: {
            ...mapGetters({}),
            columnCount: function () {
                return this.products.length === 0 ? 0 : Math.ceil(this.products.length / this.productsPerRow)
            },
            previousColumnIndex: function () {
                return (this.visibleColumnIndex === 0) ? (this.columnCount - 1) : (this.visibleColumnIndex - 1)
            },
            previousProductSet: function () {
                let upperLimit = ((this.previousColumnIndex + 1) * this.productsPerRow) - 1
                let lowerLimit = upperLimit - (this.productsPerRow - 1)
                let filteredList = this.products.filter((product, productIndex) => {
                    return (productIndex >= lowerLimit) && (productIndex <= upperLimit)
                })
                for (let counter = filteredList.length; counter < this.productsPerRow; counter++) {
                    filteredList.push({})
                }
                return filteredList
            },
            visibleProductSet: function () {
                let upperLimit = ((this.visibleColumnIndex + 1) * this.productsPerRow) - 1
                let lowerLimit = upperLimit - (this.productsPerRow - 1)
                let filteredList = this.products.filter((product, productIndex) => {
                    return (productIndex >= lowerLimit) && (productIndex <= upperLimit)
                })
                for (let counter = filteredList.length; counter < this.productsPerRow; counter++) {
                    filteredList.push({})
                }
                return filteredList
            },
            emptyView: function () {
                let upperLimit = ((this.visibleColumnIndex + 1) * this.productsPerRow) - 1
                let lowerLimit = upperLimit - (this.productsPerRow - 1)
                let filteredList = this.products.filter((product, productIndex) => {
                    return (productIndex >= lowerLimit) && (productIndex <= upperLimit)
                })
                return filteredList.length === 0
            },
            nextColumnIndex: function () {
                return (this.visibleColumnIndex === this.columnCount - 1) ? 0 : (this.visibleColumnIndex + 1)
            },
            nextProductSet: function () {
                let upperLimit = ((this.nextColumnIndex + 1) * this.productsPerRow) - 1
                let lowerLimit = upperLimit - (this.productsPerRow - 1)
                let filteredList = this.products.filter((product, productIndex) => {
                    return (productIndex >= lowerLimit) && (productIndex <= upperLimit)
                })
                for (let counter = filteredList.length; counter < this.productsPerRow; counter++) {
                    filteredList.push({})
                }
                return filteredList
            },
            swiperStyles: function () {
                return {
                    display: 'flex',
                    padding: '0px',
                    margin: '0px',
                    height: '100%',
                    width: '100%'
                }
            }
        },
        watch: {
            emptyView: function (state) {
                if (state) {
                    this.visibleColumnIndex--
                }
            },
            isFullhd: function (state) {
                if (state) {
                    this.productsPerRow = 4
                    this.accordianAnimation(this.height, 350)
                }
            },
            isWidescreenOnly: function (state) {
                if (state) {
                    this.productsPerRow = 3
                    this.accordianAnimation(this.height, 300)
                }
            },
            isDesktopOnly: function (state) {
                if (state) {
                    this.productsPerRow = 4
                    this.accordianAnimation(this.height, 250)
                }
            },
            isTabletOnly: function (state) {
                if (state) {
                    this.productsPerRow = 3
                    this.accordianAnimation(this.height, 200)
                }
            },
            isMobile: function (state) {
                if (state) {
                    this.productsPerRow = 1
                    this.accordianAnimation(this.height, 200)
                }
            },
            enterFromLeft: function (activationState) {
                if (activationState && (this.columnCount > 1)) {
                    let animateCounter = setInterval(() => {
                        this.photoSetLeftPosition = this.photoSetLeftPosition + 18
                        if (this.photoSetLeftPosition >= 0) {
                            clearInterval(animateCounter)
                            this.enterFromLeft = false
                            if (this.visibleColumnIndex === 0) {
                                this.visibleColumnIndex = this.columnCount - 1
                            } else {
                                this.visibleColumnIndex--
                            }
                            this.photoSetLeftPosition = this.productSetFrameWidth * -1
                        }
                    }, 1)
                }
            },
            enterFromRight: function (activationState) {
                if (activationState && (this.columnCount > 1)) {
                    let animateCounter = setInterval(() => {
                        this.photoSetLeftPosition = this.photoSetLeftPosition - 18
                        if (this.photoSetLeftPosition <= this.productSetFrameWidth * -2) {
                            clearInterval(animateCounter)
                            this.enterFromRight = false
                            if (this.visibleColumnIndex === this.columnCount - 1) {
                                this.visibleColumnIndex = 0
                            } else {
                                this.visibleColumnIndex++
                            }
                            this.photoSetLeftPosition = this.productSetFrameWidth * -1
                        }
                    }, 1)
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            backgroundImage: function (src) {
                return {
                    width: (1 / this.productsPerRow * 100 - 0.5) + '%',
                    'background-image': `url(${src})`,
                    'background-size': 'contain',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center'
                }
            },
            isProductOfInterest: function (productId) {
                if (this.interestedProducts.findIndex((interestedProduct) => {
                    return interestedProduct === productId
                }) !== -1) {
                    return {
                        'background-color': 'rgba(255,255,255,0.4)',
                        color: 'darkorange'
                    }
                } else {
                    return {
                        'background-color': 'rgba(0,0,0,0.2)',
                        color: 'rgba(255,255,255,0.6)'
                    }
                }
            },
            registerProductSetFrameWidth: function () {
                this.productSetFrameWidth = document.getElementById('product-set-frame').clientWidth
                this.photoSetLeftPosition = this.productSetFrameWidth * -1
            },
            accordianAnimation: function (initialHeight, targetHeight) {
                if (initialHeight !== targetHeight) {
                    this.height = initialHeight
                    if (initialHeight < targetHeight) {
                        let animationTimer = setInterval(() => {
                            this.height = this.height + 10
                            if (this.height >= targetHeight) {
                                clearInterval(animationTimer)
                            }
                        }, 10)
                    } else {
                        let animationTimer = setInterval(() => {
                            this.height = this.height - 10
                            if (this.height <= targetHeight) {
                                clearInterval(animationTimer)
                            }
                        }, 10)
                    }
                }
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () {
            this.$nextTick(() => {
                window.addEventListener('resize', this.registerProductSetFrameWidth)
                this.registerProductSetFrameWidth()
                if (this.isFullhd) {
                    this.productsPerRow = 4
                    this.accordianAnimation(0, 350)
                } else if (this.isWidescreenOnly) {
                    this.productsPerRow = 3
                    this.accordianAnimation(0, 300)
                } else if (this.isDesktopOnly) {
                    this.productsPerRow = 4
                    this.accordianAnimation(0, 250)
                } else if (this.isTabletOnly) {
                    this.productsPerRow = 3
                    this.accordianAnimation(0, 200)
                } else {
                    this.productsPerRow = 1
                    this.accordianAnimation(0, 200)
                }
            })
        },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.registerProductSetFrameWidth)
        },
        destroyed: function () { }
    }
</script>

<style scoped>
    div.card-content {
        padding: 0px;
    }

    div.content {
        margin: 0px;
        padding: 0px;
        overflow-y: hidden;
    }

    div#product-set-frame {
        /* border: 1px solid red; */
        margin: 0px;
        padding: 0px;
        display: flex;
        align-items: center;
        position: relative;
        overflow-x: hidden;
    }

    div#product-set-wrapper {
        /* border: 1px solid blue; */
        height: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.product-set {
        /* border: 1px solid green; */
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    div.product-wrapper {
        /* border: 1px solid red; */
        height: 90%;
        display: flex;
    }

    div.product-code {
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 0px 5px 0px 5px;
        align-self: flex-end;
    }

    div.selection-marker {
        font-weight: bolder;
        padding: 0px;
        align-self: flex-start;
        margin-left: auto;
    }

    div.cycle-control {
        color: darkgreen;
        margin: 0px;
        padding: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
