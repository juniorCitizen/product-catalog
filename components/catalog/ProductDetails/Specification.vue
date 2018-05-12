<template>
  <p>
    <ul>
      <li>
        weight cap: {{ specification.weightCap||'n/a' }}
      </li>
      <li>
        height: {{ specification.maxHeight||'n/a' }} ~ {{ specification.minHeight||'n/a' }}
      </li>
    </ul>
  </p>
</template>

<script>
export default {
  name: 'Specification',
  props: {
    specification: {
      type: Object,
      default() {
        return {
          weightCap: null,
          maxHeight: null,
          minHeight: null,
        }
      },
    },
  },
}
</script>

<style scoped>
p {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
</style>
