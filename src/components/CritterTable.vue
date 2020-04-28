<template>
  <div class="table">
    <Grid :style="{height: '1000px', width: '1000px', 'margin':'0 auto'}"
          :data-items="items"
          :filterable="true"
          :filter="filter"
          @filterchange="filterChange"
          :sortable="true"
          :sort="sort"
          @sortchange="sortChangeHandler"
          :columns="columns">
    </Grid>
  </div>
</template>

<script>
import { orderBy, filterBy } from '@progress/kendo-data-query';
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
      filter: {
        logic: 'and',
        filters: [
          { field: 'Owned', operator: 'neq', value: 'false' },
        ],
      },
      columns: [
        { field: 'Name' },
        { field: 'Price', type: 'number' },
        { field: 'Location' },
        { field: 'Time' },
        { field: 'Owned', filter: 'boolean' },
      ],
    };
  },
  components: {
    Grid,
  },
  computed: {
    items() {
      const orderedData = orderBy(this.createData(), this.sort);
      const filteredData = filterBy(orderedData, this.filter);
      return filteredData;
    },
  },
  methods: {
    sortChangeHandler(e) {
      this.sort = e.sort;
    },
    filterChange(ev) {
      this.filter = ev.filter;
    },
    createData() {
      if (this.reportType == 'leaving') {
        const jsonUserDataString = window.localStorage.getItem('userData') || '{}';
        let jsonUserData = { bugData: Object, fishData: Object, critterData: Object };
        jsonUserData = JSON.parse(jsonUserDataString);

        const { critterData } = jsonUserData;
        const targetData = [];
        for (let i = 0; i < critterData.length; i++) {
          const currentMonth = moment(new Date()).format('MMM');
          const nextMonth = moment(new Date()).add(1, 'months').format('MMM');
          if (critterData[i][currentMonth] == '?' && critterData[i][nextMonth] == '-') {
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
