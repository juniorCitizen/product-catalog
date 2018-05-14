<template>
  <p>{{ featureText }}</p>
</template>

<script>
export default {
  name: 'Features',
  props: {
    featureText: {
      type: String,
      default() {
        return 'Feature text line 1\nFeature text line 2\nFeature text line 3\nFeature text line 4'
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
  font-weight: 900;
}
</style>
