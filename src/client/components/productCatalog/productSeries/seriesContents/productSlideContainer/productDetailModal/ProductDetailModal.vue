<template>
    <div class="modal is-active">
        <div class="modal-background">
            <div class="modal-card">
                <modal-header :product="product"
                              @switchPhoto="switchPhoto($event)"
                              :enlargedPhotoIndex="enlargedPhotoIndex"></modal-header>
                <modal-body :product="product"
                            :enlargedPhotoIndex="enlargedPhotoIndex"></modal-body>
                <modal-footer :product="product"
                              @closingModal="closeModal"></modal-footer>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import ModalHeader from './ModalHeader.vue'
    import ModalBody from './ModalBody.vue'
    import ModalFooter from './ModalFooter.vue'

    export default {
        name: 'product-detail-modal',
        components: {
            ModalHeader,
            ModalBody,
            ModalFooter
        },
        props: ['product'],
        data: function () {
            return {
                enlargedPhotoIndex: 0
            }
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            closeModal: function () {
                this.$emit('closingModal')
            },
            switchPhoto: function ($event) {
                this.enlargedPhotoIndex = $event
            }
        }
    }
</script>

<style scoped></style>
