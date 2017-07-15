<template>
    <div class="field">
        <br>
        <div v-for="rowIndex in rows"
             :key="rowIndex-1"
             class="columns">
            <div v-for="columnIndex in columnCount(rowIndex-1)"
                 :key="columnIndex"
                 class="column is-1">
                <img :src="`${host}:${port}/${sysRef}/api/photos?photoId=`+imageIdList[imageIdIndex(rowIndex-1, columnIndex)]"
                     :alt="imageIdList[imageIdIndex(rowIndex-1, columnIndex)]">
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import eVars from '../../../server/config/environment'

    export default {
        name: 'image-display',
        components: {},
        props: ['imageIdList'],
        data: function () {
            return {
                host: eVars.HOST,
                port: eVars.PORT,
                sysRef: eVars.SYS_REF
            }
        },
        computed: {
            ...mapGetters({}),
            rows: function () {
                return Math.ceil(this.imageIdList.length / 12)
            }
        },
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            columnCount: function (rowIndex) {
                let preceedingCount = rowIndex * 12
                let itemCount = this.imageIdList.length - preceedingCount
                return itemCount > 12 ? 12 : itemCount
            },
            imageIdIndex: function (rowIndex, columnIndex) {
                return (rowIndex * 12) + (columnIndex - 1)
            }
        }
    }
</script>

<style scoped></style>
