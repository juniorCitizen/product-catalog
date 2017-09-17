<template>
    <div class="card-content">
        <div id="photo-frame"
             class="content"
             :style="{height:height+'px'}">
            <div id="photo-slide-wrapper"
                 :style="{left:photoSlideLeftPosition+'px'}">
                <div class="photo-slide"
                     :style="{width:(photoFrameWidth)+'px'}">
                    <div class="image-wrapper"
                         :style="backgroundImage(`${$eVars.API_URL}/photos?photoId=${products[previousProductIndex].photos[0].id}`)">
                        <div class="product-code">
                            ({{previousProductIndex+1}}) {{products[previousProductIndex].code}}
                        </div>
                        <div class="selection-marker"
                             :style="isProductOfInterest(products[previousProductIndex].id)"
                             @click="$emit('selectProductEvent',products[previousProductIndex].id)">
                            <span class="icon is-medium">
                                <i class="fa fa-check-circle"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <v-touch @swiperight="enterFromLeft=true"
                         @swipeleft="enterFromRight=true">
                    <div class="photo-slide"
                         :style="{width:(photoFrameWidth)+'px'}">
                        <div class="image-wrapper"
                             :style="backgroundImage(`${$eVars.API_URL}/photos?photoId=${products[visibleProductIndex].photos[0].id}`)">
                            <div class="product-code">
                                ({{visibleProductIndex+1}}) {{products[visibleProductIndex].code}}
                            </div>
                            <div class="selection-marker"
                                 :style="isProductOfInterest(products[visibleProductIndex].id)"
                                 @click="$emit('selectProductEvent',products[visibleProductIndex].id)">
                                <span class="icon is-medium">
                                    <i class="fa fa-check-circle"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </v-touch>
                <div class="photo-slide"
                     :style="{width:(photoFrameWidth)+'px'}">
                    <div class="image-wrapper"
                         :style="backgroundImage(`${$eVars.API_URL}/photos?photoId=${products[nextProductIndex].photos[0].id}`)">
                        <div class="product-code">
                            ({{nextProductIndex+1}}) {{products[nextProductIndex].code}}
                        </div>
                        <div class="selection-marker"
                             :style="isProductOfInterest(products[nextProductIndex].id)"
                             @click="$emit('selectProductEvent',products[nextProductIndex].id)">
                            <span class="icon is-medium">
                                <i class="fa fa-check-circle"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'mobile-product-viewer',
        components: {},
        props: [
            'products',
            'interestedProducts'
        ],
        data: function () {
            return {
                height: 200,
                visibleProductIndex: 0,
                enterFromLeft: false,
                enterFromRight: false,
                photoFrameWidth: 0,
                photoSlideLeftPosition: 0
            }
        },
        computed: {
            ...mapGetters({}),
            previousProductIndex: function () {
                return (this.visibleProductIndex === 0) ? (this.products.length - 1) : (this.visibleProductIndex - 1)
            },
            nextProductIndex: function () {
                return (this.visibleProductIndex === this.products.length - 1) ? 0 : (this.visibleProductIndex + 1)
            }
        },
        watch: {
            enterFromLeft: function (activationState) {
                if (activationState && (this.products.length > 1)) {
                    let animateCounter = setInterval(() => {
                        this.photoSlideLeftPosition = this.photoSlideLeftPosition + 10
                        if (this.photoSlideLeftPosition >= 0) {
                            clearInterval(animateCounter)
                            this.enterFromLeft = false
                            if (this.visibleProductIndex === 0) {
                                this.visibleProductIndex = this.products.length - 1
                            } else {
                                this.visibleProductIndex--
                            }
                            this.photoSlideLeftPosition = this.photoFrameWidth * -1
                        }
                    }, 1)
                }
            },
            enterFromRight: function (activationState) {
                if (activationState && (this.products.length > 1)) {
                    let animateCounter = setInterval(() => {
                        this.photoSlideLeftPosition = this.photoSlideLeftPosition - 10
                        if (this.photoSlideLeftPosition <= this.photoFrameWidth * -2) {
                            clearInterval(animateCounter)
                            this.enterFromRight = false
                            if (this.visibleProductIndex === this.products.length - 1) {
                                this.visibleProductIndex = 0
                            } else {
                                this.visibleProductIndex++
                            }
                            this.photoSlideLeftPosition = this.photoFrameWidth * -1
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
                    height: '90%',
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
            registerPhotoFrameWidth: function () {
                this.photoFrameWidth = document.getElementById('photo-frame').clientWidth
                this.photoSlideLeftPosition = this.photoFrameWidth * -1
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () {
            this.$nextTick(() => {
                window.addEventListener('resize', this.registerPhotoFrameWidth)
                this.registerPhotoFrameWidth()
            })
        },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.registerPhotoFrameWidth)
        },
        destroyed: function () { }
    }
</script>

<style scoped>
    div.card-content {
        padding: 0px;
    }

    div#photo-frame.content {
        margin: 0px;
        padding: 0px;
        display: flex;
        align-items: center;
        position: relative;
        overflow-x: hidden;
    }

    div#photo-slide-wrapper {
        height: 90%;
        position: absolute;
        display: flex;
    }

    div.photo-slide {
        /* border: 1px solid red; */
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.image-wrapper {
        /* border: 1px solid green; */
        height: 100%;
        width: 90%;
        display: flex;
    }

    div.product-code {
        font-size: 75%;
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
</style>
