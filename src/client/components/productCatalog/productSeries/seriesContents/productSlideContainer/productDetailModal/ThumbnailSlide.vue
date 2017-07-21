<template>
    <div class="slide-container column is-paddingless"
         :class="{'slide-left': slideLeft,'slide-right': slideRight,'is-2': displayCount===6,'is-3': displayCount===4,'is-4': displayCount===3}">
        <div class="thumbnail-container"
             :class="{'onDisplay':onDisplay}"
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
            'displayCount',
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
    .onDisplay {
        box-shadow: 0px 0px 1px 1px lightgreen;
    }

    div.slide-container {
        border: none;
        overflow: visible;
    }

    div.thumbnail-container {
        border: none;
        border-radius: 5px;
        margin: 10%;
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
