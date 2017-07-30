<template>
    <div class="field is-grouped">
        <div class="control">
            <button class="button is-info"
                    :style="dynamicButtonSize"
                    @click="userRegistration">
                REGISTER
            </button>
        </div>
        <div class="control">
            <button class="button is-success"
                    :style="dynamicButtonSize"
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
            ...mapGetters({}),
            dynamicButtonSize: function () {
                if (this.isTouch) {
                    return { 'font-size': '75%' }
                } else {
                    return { 'font-size': '130%' }
                }
            }
        },
        methods: {
            ...mapMutations({
                resetUserData: 'resetUserData'
            }),
            ...mapActions({
                userRegistration: 'userRegistration'
            })
        }
    }
</script>

<style scoped>
    button {
        font-style: italic;
        font-weight: bold;
    }
</style>
