<template>
    <div class="field is-grouped">
        <div class="control">
            <button class="button is-info"
                    @click="turnOnValidation">
                REGISTER
            </button>
        </div>
        <div class="control">
            <button class="button is-success"
                    @click="resetUserData">
                RESET
            </button>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'submit-controls',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({
                resetUserData: 'resetUserData',
                updateUserData: 'updateUserData',
                turnOnValidation: 'turnOnUserDataValidation'
            }),
            ...mapActions({})
        }
    }
</script>

<style scoped>
    button {
        font-style: italic;
        font-weight: bold;
        /* font-size: 90%; */
    }
</style>
