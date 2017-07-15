<template>
    <div class="card-content"
         :class="{show:activeItem, hide:!activeItem}">
        <product-scroller :products="products">
        </product-scroller>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ProductScroller from './ProductScroller.vue'

    export default {
        name: 'series-contents',
        components: { ProductScroller },
        props: ['activeItem', 'products'],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped>
    div.card-content.show {
        animation: slide-out 0.8s both;
    }

    div.card-content.hide {
        animation: slide-in 0.5s both;
    }

    div.card-content {
        overflow-y: hidden;
        padding-top: 0px;
        padding-bottom: 0px;
        height: 0px;
    }

    @keyframes slide-out {
        0% {
            padding-top: 0px;
            padding-bottom: 0px;
            height: 0px;
        }
        100% {
            padding-top: 25px;
            padding-bottom: 25px;
            height: 204px;
        }
    }

    @keyframes slide-in {
        0% {
            padding-top: 25px;
            padding-bottom: 25px;
            height: 204px;
        }
        100% {
            padding-top: 0px;
            padding-bottom: 0px;
            height: 0px;
        }
    }
</style>
