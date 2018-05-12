<template>
  <p>{{ descriptionText }}</p>
</template>

<script>
export default {
  name: 'Description',
  props: {
    descriptionText: {
      type: String,
      default() {
        return 'Description text line 1\nDescription text line 2\nDescription text line 3\nDescription text line 4'
      },
    },
  },
}
</script>

<style scoped>
p {
  white-space: pre-line;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
</style>
