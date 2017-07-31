<template>
    <div class="field is-grouped">
        <div class="control">
            <button class="button"
                    :class="dynamicIconColoring"
                    :style="dynamicButtonSizing"
                    :disabled="ajaxRequestPending"
                    @click="userRegistration">
                <span v-if="ajaxRequestPending"
                      class="icon"
                      :class="dynamicIconSizing">
                    <i class="fa fa-spinner fa-pulse"></i>
                </span>
                <span v-if="!ajaxRequestPending">REGISTER</span>
                <span v-if="ajaxRequestPending">PROCESSING</span>
            </button>
        </div>
        <div class="control">
            <button class="button is-success"
                    :style="dynamicButtonSizing"
                    :disabled="ajaxRequestPending"
                    @click="resetUserData">
                <span>RESET</span>
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
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending'
            }),
            dynamicIconColoring: function () {
                return { 'is-info': !this.ajaxRequestPending, 'is-danger': this.ajaxRequestPending }
            },
            dynamicIconSizing: function () {
                return { 'is-small': this.isTouch, 'is-medium': !this.isTouch }
            },
            dynamicButtonSizing: function () {
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
