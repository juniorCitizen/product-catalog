<template>
    <div class="hero-body"
         :style="dynamicStyle">
        <h1 class="column notification is-success has-text-centered"
            :class="dynamicBannerSizing"
            :style="responsiveBannerStyle">
            <b>
                <i>CONTACT INFORMATION</i>
            </b>
        </h1>
        <office-tabs></office-tabs>
        <information-area></information-area>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import OfficeTabs from './OfficeTabs/OfficeTabs.vue'
    import InformationArea from './InformationArea/InformationArea.vue'

    export default {
        name: 'contact-page',
        components: {
            OfficeTabs,
            InformationArea
        },
        data: function () {
            return {}
        },
        computed: {
            ...mapGetters({}),
            dynamicBannerSizing: function () {
                return {
                    'is-paddingless': this.isTouch,
                    'is-size-4': !this.isTouch && !this.isFullhd,
                    'is-size-3': this.isFullhd
                }
            },
            dynamicStyle: function () {
                if (this.isTouch) {
                    return {
                        'padding-top': '5px',
                        'padding-bottom': '30px'
                    }
                } else {
                    return {
                        'padding-top': '15px',
                        'padding-bottom': '30px'
                    }
                }
            },
            responsiveBannerStyle: function () {
                if (!this.isTouch) {
                    return {
                        // 'border': '1px solid black',
                        'padding-top': '5px',
                        'padding-bottom': '5px'
                    }
                }
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({})
        }
    }
</script>

<style scoped>
    .tile {
        border: none;
    }
</style>
