<template>
    <span class="thumbnail-slide-container column columns is-marginless is-paddingless">
        <thumbnail-slide v-for="productPhoto in visibleThumbnails"
                         :enlargedPhotoIndex="enlargedPhotoIndex"
                         :key="productPhoto.photoIndexInProduct"
                         :currentPhotoIndex="currentPhotoIndex"
                         :displayCount="displayCount"
                         :productPhoto="productPhoto"
                         :slideLeft="slideLeft"
                         :slideRight="slideRight"
                         @switchPhoto="switchPhoto($event)">
        </thumbnail-slide>
    </span>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ThumbnailSlide from './ThumbnailSlide.vue'

    export default {
        name: 'thumnail-slide-container',
        components: { ThumbnailSlide },
        props: [
            'enlargedPhotoIndex',
            'displayCount',
            'productPhotos',
            'slideLeft',
            'slideRight'
        ],
        watch: {
            slideLeft: function (activated) {
                if (activated) {
                    if (this.productPhotos.length > this.displayCount) {
                        this.visibleThumbnails.push(this.nextPhotoWaitingOnRight)
                        setTimeout(() => {
                            this.visibleThumbnails.splice(0, 1)
                            this.$emit('slidingAnimationCompleted')
                        }, 330)
                    }
                }
            },
            slideRight: function (activated) {
                if (activated) {
                    if (this.productPhotos.length > this.displayCount) {
                        this.visibleThumbnails.splice(0, 0, this.nextPhotoWaitingOnLeft)
                        setTimeout(() => {
                            this.visibleThumbnails.splice(this.displayCount, 1)
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
                visibleThumbnails: []
            }
        },
        computed: {
            ...mapGetters({}),
            nextPhotoWaitingOnLeft: function () {
                if (this.productPhotos.length <= this.displayCount) {
                    return null
                } else {
                    let slideInPhotoIndex = this.visibleThumbnails[0].photoIndexInProduct === 0 ? (this.productPhotos.length - 1) : (this.visibleThumbnails[0].photoIndexInProduct - 1)
                    return {
                        imagePath: `${this.host}:${this.port}/${this.sysRef}/api/photos?photoId=${this.productPhotos[slideInPhotoIndex].id}`,
                        photoIndexInProduct: slideInPhotoIndex
                    }
                }
            },
            nextPhotoWaitingOnRight: function () {
                if (this.productPhotos.length <= this.displayCount) {
                    return null
                } else {
                    let slideInPhotoIndex = this.visibleThumbnails[(this.displayCount - 1)].photoIndexInProduct < (this.productPhotos.length - 1) ? (this.visibleThumbnails[(this.displayCount - 1)].photoIndexInProduct + 1) : 0
                    return {
                        imagePath: `${this.host}:${this.port}/${this.sysRef}/api/photos?photoId=${this.productPhotos[slideInPhotoIndex].id}`,
                        photoIndexInProduct: slideInPhotoIndex
                    }
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            switchPhoto: function ($event) {
                this.$emit('switchPhoto', $event)
            }
        },
        beforeMount: function () {
            for (let photoIndex = 0; photoIndex < this.displayCount; photoIndex++) {
                if (photoIndex < (this.productPhotos.length)) {
                    this.visibleThumbnails.push({
                        imagePath: `${this.host}:${this.port}/${this.sysRef}/api/photos?photoId=${this.productPhotos[photoIndex].id}`,
                        photoIndexInProduct: photoIndex
                    })
                }
            }
        }
    }
</script>

<style scoped>
    span.thumbnail-slide-container {
        overflow-x: hidden;
        border: none;
        transform: scaleY(1.2);
    }
</style>
