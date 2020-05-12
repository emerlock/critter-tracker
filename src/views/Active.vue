<template>
  <div class="home">
    <h1>Currently Catchable</h1>
    <TimeFilter />
    <CritterTable report-type="active" />
  </div>
</template>

<script>
// @ is an alias to /src
import CritterTable from '@/components/CritterTable.vue';
import TimeFilter from '@/components/TimeFilter.vue';

export default {
  name: 'Active',
  components: {
    CritterTable,
    TimeFilter,
  },
};
</script>
