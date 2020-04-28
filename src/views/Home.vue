<template>
  <div class="home">
    <CritterTable report-type="all" />
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
