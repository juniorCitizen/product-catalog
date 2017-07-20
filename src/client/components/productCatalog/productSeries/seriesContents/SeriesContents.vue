<template>
    <div class="card-content"
         :class="{show:activeItem, hide:!activeItem}">
        <series-scroller :products="products"></series-scroller>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import SeriesScroller from './SeriesScroller.vue'

    export default {
        name: 'series-contents',
        components: { SeriesScroller },
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
        animation: expand 0.6s both;
    }

    div.card-content.hide {
        animation: retract 0.6s both;
    }

    div.card-content {
        overflow-y: hidden;
        padding-top: 0px;
        padding-bottom: 0px;
        height: 0px;
        border: none;
    }

    @keyframes expand {
        0% {
            padding-top: 0px;
            padding-bottom: 0px;
            height: 0px;
        }
        100% {
            padding-top: 25px;
            padding-bottom: 25px;
            height: 300px;
        }
    }

    @keyframes retract {
        0% {
            padding-top: 25px;
            padding-bottom: 25px;
            height: 300px;
        }
        100% {
            padding-top: 0px;
            padding-bottom: 0px;
            height: 0px;
        }
    }
</style>
