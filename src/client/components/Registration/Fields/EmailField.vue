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
        <p v-if="validationFailure&&!emptyInputField"
           class="help is-danger">
            This email address is invalid
        </p>
        <p v-if="validationFailure&&emptyInputField"
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
                ajaxRequestPending: 'ajaxRequestPending', // pending deprecation
                emailInStore: 'userEmail',
                validationInEffect: 'validatingUserData'
            }),
            dynamicInputClass: function () {
                return {
                    'is-danger': this.validationFailure,
                    'is-small': this.isTouch,
                    'is-medium': !this.isTouch
                }
            },
            dynamicIconClass: function () {
                return {
                    'is-small': this.isTouch,
                    'is-medium': !this.isTouch
                }
            },
            emailIsValid: function () {
                return (/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(this.emailInStore))
            },
            validationFailure: function () {
                return (
                    (this.validationInEffect && !this.emailInStore) ||
                    (this.validationInEffect && !this.emailIsValid)
                )
            },
            emptyInputField: function () {
                return this.validationInEffect && !this.emailInStore
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
