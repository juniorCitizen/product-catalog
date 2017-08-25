<template>
    <div class="field">
        <div class="control has-icons-left">
            <input class="input"
                   :class="dynamicClass"
                   type="email"
                   v-model="email"
                   placeholder="電子郵件"
                   :disabled="dataSubmissionInProgress">
            <span class="icon is-left">
                <i class="fa fa-envelope"></i>
            </span>
        </div>
        <p v-if="warning"
           class="help is-danger">
            未輸入電子郵件或格式錯誤
        </p>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'email',
        components: {},
        props: [
            'resetFieldValue'
        ],
        data: function () {
            return {
                email: ''
            }
        },
        computed: {
            ...mapGetters({
                dataSubmissionInProgress: 'dataSubmissionInProgress',
                loginFormEmailReady: 'loginFormEmailReady',
                loginFormValidation: 'loginFormValidation'
            }),
            warning: function () {
                return !this.loginFormEmailReady && this.loginFormValidation
            },
            dynamicClass: function () {
                return {
                    'is-danger': this.warning
                }
            }
        },
        watch: {
            email: function (updatedEmail) {
                this.registerLoginFormEmail(updatedEmail)
            },
            resetFieldValue: function (state) {
                if (state === true) { this.email = '' }
            }
        },
        methods: {
            ...mapMutations({
                registerLoginFormEmail: 'registerLoginFormEmail'
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
