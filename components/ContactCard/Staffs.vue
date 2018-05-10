<template>
  <div class="staff-container">
    <div v-for="staff in staffs"
         :key="staff._uid"
         class="staff-card">
      <div
        class="staff-name-text">
        <span class="icon">
          <i class="fas fa-user-circle"/>
        </span>
        {{ staff.name }}
      </div>
      <div
        class="staff-email-text">
        <span class="icon">
          <i class="fas fa-envelope"/>
        </span>
        <a :href="`mailto:${staff.email}`">
          {{ staff.email }}
        </a>
      </div>
      <div v-if="staff.mobile"
           class="staff-mobile-text">
        <span class="icon">
          <i class="fas fa-mobile"/>
        </span>
        {{ staff.mobile }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Staff',
  props: {
    staffs: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped>
.staff-container {
  display: grid;
  grid-gap: 30px 15px;
  grid-template-columns: repeat(auto-fill, minmax(min-content, 1fr));
  margin-top: 15px;
  padding: 15px;
}

.staff-card {
  border-left: 2px solid rgb(36, 145, 145);
  border-radius: 5px;
  padding-top: 5px;
  padding-left: 10px;
  padding-bottom: 5px;
}

.staff-name-text {
  font-weight: bold;
  font-style: italic;
}
</style>
