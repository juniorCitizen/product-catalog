<template>
    <div class="field">
        <div class="control">
            <textarea class="textarea"
                      :class="dynamicInputClass"
                      v-model="comments"
                      :disabled="ajaxRequestPending"
                      placeholder="Comments">
            </textarea>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'comments-field',
        components: {},
        props: [],
        data: function () {
            return {
                comments: ''
            }
        },
        computed: {
            ...mapGetters({
                ajaxRequestPending: 'ajaxRequestPending', // pending deprecation
                commentsInStore: 'userComments'
            }),
            dynamicInputClass: function () {
                return {
                    'is-small': this.isTouch,
                    'is-medium': !this.isTouch
                }
            }
        },
        watch: {
            commentsInStore: function (newStoreValue) {
                this.comments = newStoreValue
            },
            comments: function (updatedFieldValue) {
                this.updateUserData({
                    comments: updatedFieldValue
                })
            }
        },
        methods: {
            ...mapMutations({ updateUserData: 'updateUserData' }),
            ...mapActions({})
        },
        mounted: function () {
            this.comments = this.commentsInStore
        }
    }
</script>

<style scoped></style>
