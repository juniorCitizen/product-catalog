<template>
    <div class="column has-text-centered"
         v-if="(interestedItems.length > 0) && (currentView === 'products')">
        <button class="button is-medium is-info is-outlined is-marginless"
                @click="$emit('submitInterestEventTriggered')">
            <b>SUBMIT</b>&nbsp;Selection
        </button>
        <button class="button is-medium is-danger is-outlined is-marginless"
                @click="resetItemsOfInterest()">
            <b>CLEAR</b>&nbsp;Selection
        </button>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'interest-controls',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                currentView: 'currentView',
                interestedItems: 'interestedItems'
            }),
            isEven: function () {
                return this.count % 2 === 0
            }
        },
        methods: {
            ...mapMutations({ resetItemsOfInterest: 'resetItemsOfInterest' }),
            ...mapActions({})
        }
    }
</script>

<style scoped>
    div.column {
        margin-top: auto;
        margin-bottom: auto;
    }
</style>
