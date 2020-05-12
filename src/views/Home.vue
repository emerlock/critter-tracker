<template>
  <div class="home">
    <h1>All Critters</h1>
    <TimeFilter />
    <CritterTable report-type="all" />
  </div>
</template>

<script>
// @ is an alias to /src
import CritterTable from '@/components/CritterTable.vue';
import TimeFilter from '@/components/TimeFilter.vue';

export default {
  name: 'Home',
  components: {
    CritterTable,
    TimeFilter,
  },
};
</script>
