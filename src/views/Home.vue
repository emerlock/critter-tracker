<template>
  <div class="home">
    <h1>All Critters</h1>
    <!--<AddCritter />-->
    <CritterTable report-type="all" />
  </div>
</template>

<script>
// @ is an alias to /src
import CritterTable from '@/components/CritterTable.vue';
import AddCritter from '@/components/AddCritter.vue';

export default {
  name: 'Home',
  components: {
    CritterTable,
    AddCritter,
  },
};

</script>
