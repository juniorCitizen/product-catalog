<template>
  <p>
    <ul>
      <li>
        weight: {{ specification.weight||'n/a' }}
      </li>
      <li>
        weight cap: {{ specification.weightCap||'n/a' }}
      </li>
      <li>
        adj. height: {{ specification.maxHeight||'n/a' }} ~ {{ specification.minHeight||'n/a' }}
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
          weight: null,
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
  font-weight: 900;
}
</style>
