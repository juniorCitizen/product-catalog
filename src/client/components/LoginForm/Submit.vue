<template>
    <div class="control">
        <button class="button is-primary"
                @click="handleLoginFormSubmission"
                :disabled="dataSubmissionInProgress">
            <template v-if="!dataSubmissionInProgress">
                <span v-if="loginFormReadyToSubmit">登入</span>
                <span v-else>登入資料不完整</span>
            </template>
            <template v-else>
                <span class="icon">
                    <i class="fa fa-spinner fa-pulse"></i>
                </span>
                <span>帳號查驗中</span>
            </template>
        </button>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'submit',
        components: {},
        props: [],
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({
                dataSubmissionInProgress: 'dataSubmissionInProgress',
                loginFormReadyToSubmit: 'loginFormReadyToSubmit',
                loginFormValidation: 'loginFormValidation'
            })
        },
        watch: {},
        methods: {
            ...mapMutations({
                toggleLoginFormValidation: 'toggleLoginFormValidation',
                toggleDataSubmissionState: 'toggleDataSubmissionState',
                resetDataSubmissionState: 'resetDataSubmissionState'
            }),
            ...mapActions({
                userLogin: 'userLogin'
            }),
            handleLoginFormSubmission: function () {
                if (!this.loginFormValidation) {
                    this.toggleLoginFormValidation()
                }
                if (this.loginFormReadyToSubmit) {
                    this
                        .userLogin()
                        .then(() => {
                            this.$emit('clearLoginFormEvent')
                            alert('登入成功')
                            this.$router.replace('/productCatalog/admin')
                        })
                        .catch((error) => {
                            this.$emit('clearLoginFormEvent')
                            console.log(error.name)
                            console.log(error.message)
                            console.log(error.stack)
                            alert('登入失敗')
                        })
                }
            }
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
