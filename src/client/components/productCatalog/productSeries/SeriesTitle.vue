<template>
    <p class="card-header-title"
       :class="{'is-active':activeItem, 'is-inactive':!activeItem}">
        <i>
            {{ seriesItem.reference }} Series - {{ seriesProductCount }}
            <span v-if="seriesProductCount>1">Items</span>
            <span v-else>Item</span>
        </i>
    </p>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'series-title',
        components: {},
        props: [
            'activeItem',
            'seriesItem',
            'seriesProductCount'
        ],
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

<style lang="sass" scoped>
    @keyframes activate {
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

    @keyframes deactivate {
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
        animation: activate 0.3s both;
    }

    p.card-header-title.is-inactive {
        animation: deactivate 0.3s both;
    }
</style>
