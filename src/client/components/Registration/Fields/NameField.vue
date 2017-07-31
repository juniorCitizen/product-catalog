<template>
    <div class="field">
        <div class="control has-icons-left">
            <input class="input"
                   :class="dynamicInputClass"
                   type="text"
                   v-model="name"
                   :disabled="ajaxRequestPending"
                   placeholder="Name">
            <span class="icon is-left"
                  :class="dynamicIconClass">
                <i class="fa fa-user"></i>
            </span>
        </div>
        <p v-if="fieldEvalState.nameIsBlank"
           class="help is-danger">
            Your name is required
        </p>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'name-field',
        components: {},
        props: [],
        data: function () {
            return {
                name: ''
            }
        },
        computed: {
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending',
                fieldEvalState: 'fieldEvalState',
                nameInStore: 'userName'
            }),
            dynamicInputClass: function () {
                return {
                    'is-danger': this.fieldEvalState.nameIsBlank,
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
            nameInStore: function (newStoreValue) {
                this.name = newStoreValue
            },
            name: function (updatedFieldValue) {
                this.updateUserData({
                    name: updatedFieldValue
                })
            }
        },
        methods: {
            ...mapMutations({ updateUserData: 'updateUserData' }),
            ...mapActions({})
        },
        mounted: function () {
            this.name = this.nameInStore
        }
    }
</script>

<style scoped></style>
