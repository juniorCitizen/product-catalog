<template>
    <div class="column is-2">
        <div class="thumbnail-container is-marginless"
             @click="switchPhoto">
            <span>
                <img class="image slideing-left"
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
    img.image {
        border: none;
        border-radius: 12px;
        height: 45px;
        transition: transform 0.5s;
        z-index: 0;
    }

    img.image:hover {
        transform: scale(1.4);
    }

    img.slideing-left {
        animation: slide-left 0.5s;
    }

    @keyframes slide-left {
        0% {
            transform: translateX(0px);
        }
        100% {
            transform: translateX(-20px);
        }
    }
</style>
