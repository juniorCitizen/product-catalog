<template>
    <div class="slide-container column is-2 is-paddingless"
         :class="{'slide-left': slideLeft, 'slide-right': slideRight}">
        <div class="thumbnail-container"
             :class="{'glowing-border':onDisplay}"
             @click="switchPhoto">
            <img class="image"
                 :src="productPhoto.imagePath">
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'thumbnail-slide',
        components: {},
        props: [
            'enlargedPhotoIndex',
            'productPhoto',
            'slideLeft',
            'slideRight'
        ],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),
            onDisplay: function () {
                return this.enlargedPhotoIndex === this.productPhoto.photoIndexInProduct
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            switchPhoto: function () {
                this.$emit('switchPhoto', this.productPhoto.photoIndexInProduct)
            }
        }
    }
</script>

<style scoped>
    .glowing-border {
        box-shadow: 0 0 20px blue;
    }

    div.slide-container {
        border: none;
        overflow: visible;
    }

    div.thumbnail-container {
        border: none;
        border-radius: 6px;
        margin: 5%;
        overflow: visible;
    }

    img {
        border: none;
        margin: 10px 0px 10px 0px;
        border-radius: 6px;
        height: 35px;
        z-index: 0;
        transition: transform 0.5s;
    }

    img:hover {
        transform: scale(1.3);
    }

    div.slide-container.slide-left {
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

    div.slide-container.slide-right {
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
</style>
