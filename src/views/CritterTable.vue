<template>
  <div id="app">
    <Grid :style="{height: '1000px', width: '1000px', 'margin':'0 auto'}"
        :data-items="items"
      :columns="columns">
    </Grid>
  </div>
</template>

<script>
import { Grid } from '@progress/kendo-vue-grid';

export default {
  name: 'CritterTable',
  data() {
    return {
      items: [],
      columns: [
        { field: 'Name' },
        { field: 'Price' },
        { field: 'Location' },
        { field: 'Time' },
        { field: 'Start Date' },
        { field: 'End Date' },
      ],
    };
  },
  components: {
    Grid,
  },
  methods: {
    createData() {
      const jsonUserDataString = window.localStorage.getItem('userData') || '{}';
      let jsonUserData = { bugData: Object, fishData: Object };
      jsonUserData = JSON.parse(jsonUserDataString);
      return jsonUserData.bugData;
    },
  },
  mounted() {
    this.items = this.createData();
  },
};
</script>

<style lang="scss">

@import '../../node_modules/@progress/kendo-theme-material/dist/all.scss';

</style>
