<template>
  <div class="home">
    <h1>New this month!</h1>
    <CritterTable report-type="new" />
  </div>
</template>

<script>
// @ is an alias to /src
import CritterTable from '@/components/CritterTable.vue';

export default {
  name: 'New',
  components: {
    CritterTable,
  },
};
</script>
