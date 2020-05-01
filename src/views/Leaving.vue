<template>
  <div class="home">
    <h1>Last chance!</h1>
    <CritterTable report-type="leaving" />
  </div>
</template>

<script>
// @ is an alias to /src
import CritterTable from '@/components/CritterTable.vue';

export default {
  name: 'Leaving',
  components: {
    CritterTable,
  },
};
</script>
