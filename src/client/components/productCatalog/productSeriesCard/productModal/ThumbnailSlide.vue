<template>
    <div class="column is-2">
        <div class="thumbnail-container is-marginless"
             @click="switchPhoto">
            <span>
                <img class="image"
                     style="height:45px;"
                     :src="`${host}:${port}/${sysRef}/api/photos?photoId=${productPhoto.id}`">
            </span>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import eVars from '../../../../../server/config/environment'

    export default {
        name: 'thumbnail-slide',
        components: {},
        props: ['productPhoto', 'photoIndex'],
        data: function () {
            return {
                host: eVars.HOST,
                port: eVars.PORT,
                sysRef: eVars.SYS_REF
            }
        },
        computed: {
            ...mapGetters({})
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            switchPhoto: function () {
                this.$emit('switchPhoto', {
                    photoId: this.productPhoto.id,
                    photoIndex: this.photoIndex
                })
            }
        }
    }
</script>

<style scoped>
    .thumbnail-container {
        border: 1px rgba(0, 0, 0, 0.3) solid;
        border-radius: 10px;
    }
</style>
