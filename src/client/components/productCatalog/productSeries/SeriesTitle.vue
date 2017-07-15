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

<style scoped></style>
