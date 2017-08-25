<template>
    <div class="field">
        <div class="control has-icons-left">
            <input class="input"
                   :class="dynamicClass"
                   type="password"
                   v-model="password"
                   placeholder="登入密碼"
                   :disabled="dataSubmissionInProgress">
            <span class="icon is-left">
                <i class="fa fa-key"></i>
            </span>
        </div>
        <p v-if="warning"
           class="help is-danger">
            登入密碼為必塡項目
        </p>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'password',
        components: {},
        props: [
            'resetFieldValue'
        ],
        data: function () {
            return {
                password: ''
            }
        },
        computed: {
            ...mapGetters({
                dataSubmissionInProgress: 'dataSubmissionInProgress',
                loginFormPasswordReady: 'loginFormPasswordReady',
                loginFormValidation: 'loginFormValidation'
            }),
            warning: function () {
                return !this.loginFormPasswordReady && this.loginFormValidation
            },
            dynamicClass: function () {
                return {
                    'is-danger': this.warning
                }
            }
        },
        watch: {
            password: function (updatedPassword) {
                this.registerLoginFormPassword(updatedPassword)
            },
            resetFieldValue: function (state) {
                if (state === true) { this.password = '' }
            }
        },
        methods: {
            ...mapMutations({
                registerLoginFormPassword: 'registerLoginFormPassword'
            }),
            ...mapActions({})
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () { },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () { },
        destroyed: function () { }
    }
</script>

<style scoped></style>
