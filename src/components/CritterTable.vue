<template>
  <div class="table">
    <Grid :style="{height: '1000px', width: '1000px', 'margin':'0 auto'}"
          :data-items="items"
          :sortable="true"
          :sort="sort"
          :columns="columns"
          @sortchange="sortChangeHandler">
    </Grid>
  </div>
</template>

<script>
import { orderBy } from '@progress/kendo-data-query';
import { Grid } from '@progress/kendo-vue-grid';
import * as moment from 'moment';

export default {
  name: 'CritterTable',
  props: {
    reportType: String,
  },
  data() {
    return {
      sort: [
        { field: 'Name', dir: 'asc' },
      ],
      columns: [
        { field: 'Name' },
        { field: 'Price', type: 'number' },
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
  computed: {
    items: {
      get() {
        return orderBy(this.createData(), this.sort);
      },
    },
  },
  methods: {
    sortChangeHandler(e) {
      this.sort = e.sort;
    },
    createData() {
      console.log(this.reportType);
      if (this.reportType == 'leaving') {
        const jsonUserDataString = window.localStorage.getItem('userData') || '{}';
        let jsonUserData = { bugData: Object, fishData: Object, critterData: Object };
        jsonUserData = JSON.parse(jsonUserDataString);

        const { critterData } = jsonUserData;
        const targetData = [];
        for (let i = 0; i < critterData.length; i++) {
          const nextMonth = moment(new Date()).add(1, 'month').format('MMM');
          const targetDate = critterData[i]['End Date'];
          if (nextMonth == targetDate) {
            targetData.push(critterData[i]);
          }
        }
        return targetData;
      }
      const jsonUserDataString = window.localStorage.getItem('userData') || '{}';
      let jsonUserData = { bugData: Object, fishData: Object, critterData: Object };
      jsonUserData = JSON.parse(jsonUserDataString);
      return jsonUserData.critterData;
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
