<template>
    <div class="column is-2">
        <div class="thumbnail-container is-marginless"
             @click="switchPhoto">
            <span>
                <img class="image"
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
        props: ['productPhoto'],
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
                this.$emit('switchPhoto', this.productPhoto.id)
            }
        }
    }
</script>

<style scoped>
    .thumbnail-container {
        border: 1px rgba(0, 0, 0, 0.3) solid;
        border-radius: 10px;
    }

    img.image {
        height: 45px;
    }
</style>
