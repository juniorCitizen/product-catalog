<template>
    <div class="columns">
        <div class="column">
            <div class="columns"
                 v-for="rowIndex in rows"
                 :key="rowIndex">
                <div class="column"
                     :class="photoCellsPerRow.sizingClass"
                     v-for="columnIndex in columnCount(rowIndex)"
                     :key="columnIndex">
                    <photo :photoFile="imageList[imageIndex(rowIndex,columnIndex)]"
                           :revokeState="revokeState">
                    </photo>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters, mapMutations } from 'vuex'

    import Photo from './Photo.vue'

    export default {
        name: 'image-display',
        components: { Photo },
        props: [
            'imageList',
            'revokeState'
        ],
        data: function () {
            return {
                // available settings
                // cellCount: 12, sizingClass: 'is-1' // smallest
                // cellCount: 6, sizingClass: 'is-2'
                // cellCount: 4, sizingClass: 'is-3'
                // cellCount: 3, sizingGlass: 'is-4'
                // cellCount: 2, sizingGlass: 'is-6'
                // cellCount: 1, sizingGlass: '' // largest
                photoCellsPerRow: {
                    cellCount: 6,
                    sizingClass: 'is-2'
                }
            }
        },
        computed: {
            ...mapGetters({}),
            imageCount: function () {
                return this.imageList === null ? 0 : this.imageList.length
            },
            rows: function () {
                return Math.ceil(this.imageCount / this.photoCellsPerRow.cellCount)
            }
        },
        watch: {},
        methods: {
            ...mapMutations({}),
            ...mapActions({}),
            columnCount: function (rowIndex) {
                let preceedingCount = (rowIndex - 1) * this.photoCellsPerRow.cellCount
                let itemCount = this.imageList.length - preceedingCount
                return itemCount > this.photoCellsPerRow.cellCount ? this.photoCellsPerRow.cellCount : itemCount
            },
            imageIndex: function (rowIndex, columnIndex) {
                return ((rowIndex - 1) * this.photoCellsPerRow.cellCount) + (columnIndex - 1)
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
