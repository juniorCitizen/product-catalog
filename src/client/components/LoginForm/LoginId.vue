<template>
    <div class="field">
        <div class="control has-icons-left">
            <input class="input"
                   :class="dynamicClass"
                   type="text"
                   v-model="loginId"
                   placeholder="使用者帳號"
                   :disabled="dataSubmissionInProgress">
            <span class="icon is-left">
                <i class="fa fa-user"></i>
            </span>
        </div>
        <p v-if="warning"
           class="help is-danger">
            使用者帳號為必塡項目
        </p>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'login-id',
        components: {},
        props: [
            'resetFieldValue'
        ],
        data: function () {
            return {
                loginId: ''
            }
        },
        computed: {
            ...mapGetters({
                dataSubmissionInProgress: 'dataSubmissionInProgress',
                loginFormLoginIdReady: 'loginFormLoginIdReady',
                loginFormValidation: 'loginFormValidation'
            }),
            warning: function () {
                return !this.loginFormLoginIdReady && this.loginFormValidation
            },
            dynamicClass: function () {
                return {
                    'is-danger': this.warning
                }
            }
        },
        watch: {
            loginId: function (updatedLoginId) {
                this.registerLoginFormLoginId(updatedLoginId)
            },
            resetFieldValue: function (state) {
                if (state === true) { this.loginId = '' }
            }
        },
        methods: {
            ...mapMutations({
                registerLoginFormLoginId: 'registerLoginFormLoginId'
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
