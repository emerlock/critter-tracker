<template>
  <div class="home">
    <h1>Currently Catchable</h1>
    <CritterTable report-type="active" />
  </div>
</template>

<script>
// @ is an alias to /src
import CritterTable from '@/components/CritterTable.vue';

export default {
  name: 'Home',
  components: {
    CritterTable,
  },
};
</script>
