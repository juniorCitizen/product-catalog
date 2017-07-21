<template>
    <footer class="modal-card-foot">
        <a v-if="!isInterestedItem"
           class="button is-success"
           @click="itemSelection">
            <b>I am interested in this item</b>
        </a>
        <a v-else
           class="button is-success is-outlined"
           @click="cancelItemSelection">
            Cancel selection
        </a>
        <a class="button is-success"
           @click="closeModal">Go back</a>
    </footer>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'modal-footer',
        components: {},
        props: ['product'],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({ interestedItems: 'interestedItems' }),
            isInterestedItem: function () {
                return (this.interestedItems.indexOf(this.product.id) !== -1)
            }
        },
        methods: {
            ...mapMutations({
                addItemOfInterest: 'addItemOfInterest',
                removeItemOfInterest: 'removeItemOfInterest'
            }),
            ...mapActions({}),
            closeModal: function () {
                this.$emit('closingModal')
            },
            cancelItemSelection: function () {
                this.removeItemOfInterest(this.product.id)
                this.$emit('closingModal')
            },
            itemSelection: function () {
                this.addItemOfInterest(this.product.id)
                this.$emit('closingModal')
            }
        }
    }
</script>

<style scoped></style>
