<template>
    <a class="interest-mark">
        <i v-if="!isInterestedItem"
           class="fa fa-check-circle-o fa-3x"
           style="color: gray;"
           @click="selectInterestedItem">
        </i>
        <i v-else
           class="fa fa-check-circle fa-3x"
           style="color: green;"
           @click="deselectUninterestedItem">
        </i>
    </a>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'interest-mark',
        components: {},
        props: ['product'],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                interestedItems: 'interestedItems'
            }),
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
            callProductModal: function () {
                this.modalActiveStatus = !this.modalActiveStatus
            },
            selectInterestedItem: function () {
                this.addItemOfInterest(this.product.id)
                this.modalActiveStatus = false
            },
            deselectUninterestedItem: function () {
                this.removeItemOfInterest(this.product.id)
                this.modalActiveStatus = false
            }
        }
    }
</script>

<style scoped>
    i {
        background-color: white;
        border-radius: 100%;
    }

    .interest-mark {

        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 1;
        padding: 0px;
    }
</style>
