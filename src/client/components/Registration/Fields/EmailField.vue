<template>
    <div class="field">
        <div class="control has-icons-left">
            <input class="input"
                   :class="dynamicInputClass"
                   type="email"
                   v-model="email"
                   :disabled="ajaxRequestPending"
                   placeholder="Email">
            <span class="icon is-left"
                  :class="dynamicIconClass">
                <i class="fa fa-envelope"></i>
            </span>
        </div>
        <p v-if="fieldEvalState.emailIsInvalid"
           class="help is-danger">
            This email address is invalid
        </p>
        <p v-if="fieldEvalState.emailIsBlank"
           class="help is-danger">
            Your email is required
        </p>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'email-field',
        components: {},
        props: [],
        data: function () {
            return {
                email: ''
            }
        },
        computed: {
            ...mapGetters({
                fieldEvalState: 'fieldEvalState',
                ajaxRequestPending: 'ajaxRequestPending', // pending deprecation
                emailInStore: 'userEmail'
            }),
            dynamicInputClass: function () {
                return {
                    'is-danger': this.fieldEvalState.emailIsBlank || this.fieldEvalState.emailIsInvalid,
                    'is-small': this.isTouch,
                    'is-medium': !this.isTouch
                }
            },
            dynamicIconClass: function () {
                return {
                    'is-small': this.isTouch,
                    'is-medium': !this.isTouch
                }
            }
        },
        watch: {
            emailInStore: function (newStoreValue) {
                this.email = newStoreValue
            },
            email: function (updatedFieldValue) {
                this.updateUserData({
                    email: updatedFieldValue
                })
            }
        },
        methods: {
            ...mapMutations({ updateUserData: 'updateUserData' }),
            ...mapActions({})
        },
        mounted: function () {
            this.email = this.emailInStore
        }
    }
</script>

<style scoped></style>
