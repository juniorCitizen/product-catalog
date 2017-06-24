<template>
    <div class="field">
        <br>
        <div v-for="(row, rowIndex) in rows"
             :key="rowIndex"
             class="columns">
            <div v-for="columnIndex in columnCount(rowIndex)"
                 :key="columnIndex"
                 class="column is-1">
                <img :src="'http://localhost/productCatalog/api/photos?photoId='+imageIdList[imageIdIndex(rowIndex, columnIndex)]"
                     :alt="imageIdList[imageIdIndex(rowIndex, columnIndex)]">
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    export default {
        name: 'image-id-list',
        components: {},
        props: ['imageIdList'],
        data: function () {
            return {}
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
