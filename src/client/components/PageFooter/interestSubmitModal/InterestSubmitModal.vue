<template>
    <div class="modal"
         :class="{'is-active': isActive}">
        <div class="modal-background"
             @click="$emit('closeModal')">
        </div>
        <div class="modal-card">
            <interest-submit-modal-body></interest-submit-modal-body>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import InterestSubmitModalBody from './interestSubmitModalBody/InterestSubmitModalBody.vue'

    export default {
        name: 'interest-submit-modal',
        components: { InterestSubmitModalBody },
        props: ['isActive'],
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
