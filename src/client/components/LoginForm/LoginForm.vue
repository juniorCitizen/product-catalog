<template>
    <div class="hero-body">
        <div class="container is-fluid">
            <div v-if="!isOnMobileDevice"
                 class="columns is-centered">
                <div class="column is-4 box">
                    <div class="notification has-text-centered">
                        登入系統管理介面
                    </div>
                    <email :resetFieldValue="resetFieldValue"></email>
                    <loginId :resetFieldValue="resetFieldValue"></loginId>
                    <password :resetFieldValue="resetFieldValue"></password>
                    <div class="field is-grouped">
                        <submit @clearLoginFormEvent="handleClearLoginFormEvent"></submit>
                        <reset @clearLoginFormEvent="handleClearLoginFormEvent"></reset>
                    </div>
                </div>
            </div>
            <div v-else
                 class="columns is-centered">
                <div class="column has-text-centered">不支援行動裝置解析度</div>
                <div class="column has-text-centered">Mobile Device is Unsupported</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import Email from './Email.vue'
    import LoginId from './LoginId.vue'
    import Password from './Password.vue'
    import Submit from './Submit.vue'
    import Reset from './Reset.vue'

    export default {
        name: 'login-form',
        components: {
            Email,
            LoginId,
            Password,
            Submit,
            Reset
        },
        props: [],
        data: function () {
            return {
                resetFieldValue: false
            }
        },
        computed: {
            ...mapGetters({})
        },
        watch: {},
        methods: {
            ...mapMutations({
                clearLoginForm: 'clearLoginForm'
            }),
            ...mapActions({}),
            handleClearLoginFormEvent: function () {
                this.resetFieldValue = true
                this.$nextTick(() => {
                    this.resetFieldValue = false
                    this.clearLoginForm()
                })
            }
        },
        beforeCreate: function () { },
        created: function () { },
        beforeMount: function () { },
        mounted: function () {
            this.clearLoginForm()
        },
        beforeUpdate: function () { },
        updated: function () { },
        beforeDestroy: function () {
            this.inputControl = null
            this.clearLoginForm()
        },
        destroyed: function () { }
    }
</script>

<style scoped></style>
