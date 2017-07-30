<template>
    <div class="field">
        <div class="control is-hidden">
            <input class="input is-small"
                   type="text"
                   v-model="botPrevention"
                   placeholder="Must Be Filled"
                   required>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'bot-prevention-field',
        components: {},
        props: [],
        data: function () {
            return {
                botPrevention: ''
            }
        },
        computed: {
            ...mapGetters({
                botPreventionInStore: 'userBotPrevention',
                validationInEffect: 'validatingUserData'
            })
        },
        watch: {
            botPreventionInStore: function (newStoreValue) {
                this.botPrevention = newStoreValue
            },
            botPrevention: function (updatedFieldValue) {
                this.updateUserData({
                    botPrevention: updatedFieldValue
                })
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped></style>
