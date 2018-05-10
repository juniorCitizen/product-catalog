<template>
  <div class="contact-card">
    <span class="icon">
      <i class="fas fa-globe"/>
    </span>
    <span class="country-text">
      {{ company.country }}
    </span>
    <div class="company-title-text">
      <u>{{ company.name }}</u>
    </div>
    <div class="address-text">
      <span class="icon">
        <i class="fas fa-location-arrow"/>
      </span>
      {{ company.address }}
    </div>
    <div class="telephone-text">
      <span class="icon">
        <i class="fas fa-phone"/>
      </span>
      {{ company.telephone }}
    </div>
    &nbsp;
    <div class="fax-text">
      <span class="icon">
        <i class="fas fa-fax"/>
      </span>
      {{ company.fax }}
    </div>
    <div class="certification-container">
      <div v-for="(certification,index) in certifications"
           :key="index"
           class="certification-frame">
        <img :src="certification.logoUrl"
             :alt="certification.type"
             class="certification-logo">
      </div>
    </div>
    <staffs :staffs="company.staffs"/>
  </div>
</template>

<script>
import Staffs from './Staffs'

export default {
  name: 'ContactCard',
  components: {
    Staffs,
  },
  props: {
    company: {
      type: Object,
      default() {
        return {}
      },
    },
    certifications: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Anton);

.contact-card {
  border-radius: 5px;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
  padding: 15px;
}

.country-text {
  font-weight: bold;
  font-size: 120%;
}

.company-title-text {
  font-family: 'Anton';
  font-size: 140%;
  font-style: italic;
  margin-right: 15px;
}

@media screen and (min-height: 670px) {
  .country-text {
    font-size: 150%;
  }
  .company-title-text {
    font-size: 200%;
  }
}

.address-text,
.telephone-text,
.fax-text {
  margin-top: 5px;
  font-weight: bold;
}

.telephone-text,
.fax-text {
  display: inline-block;
}

.certification-container {
  display: flex;
  align-items: center;
  align-content: flex-start;
  flex-wrap: wrap;
}

.certification-frame {
  margin-top: 15px;
  display: inline-block;
  border: 1px solid lightgray;
  margin-right: 15px;
  width: 50px;
  height: 50px;
}

.certification-logo {
  width: 100%;
  height: 100%;
}
</style>
