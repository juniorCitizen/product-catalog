<template>
    <div class="field">
        <div class="control has-icons-left">
            <input class="input"
                   :class="dynamicInputClass"
                   type="text"
                   v-model="company"
                   :disabled="ajaxRequestPending"
                   placeholder="Company">
            <span class="icon is-left"
                  :class="dynamicIconClass">
                <i class="fa fa-building"></i>
            </span>
        </div>
        <p v-if="fieldEvalState.companyIsBlank"
           class="help is-danger">
            Please specify your company name
        </p>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'company-field',
        components: {},
        props: [],
        data: function () {
            return {
                company: ''
            }
        },
        computed: {
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending', // pending deprecation
                companyInStore: 'userCompany',
                fieldEvalState: 'fieldEvalState'
            }),
            dynamicInputClass: function () {
                return {
                    'is-danger': this.fieldEvalState.companyIsBlank,
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
            companyInStore: function (newStoreValue) {
                this.company = newStoreValue
            },
            company: function (updatedFieldValue) {
                this.updateUserData({
                    company: updatedFieldValue
                })
            }
        },
        methods: {
            ...mapMutations({ updateUserData: 'updateUserData' }),
            ...mapActions({})
        },
        mounted: function () {
            this.company = this.companyInStore
        }
    }
</script>

<style scoped></style>
