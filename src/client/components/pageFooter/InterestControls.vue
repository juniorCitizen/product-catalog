<template>
    <div class="column has-text-centered"
         v-if="(interestedItems.length > 0) && (currentView === 'products')">
        <button class="button is-small is-info">
            <b>SUBMIT MY SELECTIONS</b>
        </button>
        <button class="button is-small is-danger"
                @click="resetItemsOfInterest()">
            <b>CLEAR SELECTIONS</b>
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
