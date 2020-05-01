<template>
  <div class="table">
    <Grid :style="{height: '1000px', 'margin':'0 auto'}"
          :data-items="items"
          :filterable="true"
          :filter="filter"
          @filterchange="filterChange"
          :sortable="true"
          :sort="sort"
          @sortchange="sortChangeHandler"
          :columns="columns">
          <template v-slot:filterSlotTemplate="{props, methods}">
              <div class="k-filtercell">
                <div class="k-filtercell-wrapper">
                  <input  type="text"
                          class="k-textbox"
                          :value="props.value"
                          @input="(ev) => {
                            methods.change(
                              {
                                operator: 'contains',
                                field: props.field,
                                value: ev.target.value,
                                syntheticEvent: ev
                              }
                            );
                          }">
                  <button class="k-button"
                          @click="(ev) => {
                    methods.change(
                      {
                        operator: '',
                        field: '',
                        value: '',
                        syntheticEvent: ev
                      }
                    );
                  }">
                    Clear
                  </button>
                </div>
              </div>
          </template>
          <template v-slot:filterIsEqualTemplate="{props, methods}">
              <div class="k-filtercell">
                <div class="k-filtercell-wrapper">
                  <input  type="text"
                          class="k-textbox"
                          :value="props.value"
                          @input="(ev) => {
                            methods.change(
                              {
                                operator: 'eq',
                                field: props.field,
                                value: ev.target.value,
                                syntheticEvent: ev
                              }
                            );
                          }">
                  <button class="k-button"
                          @click="(ev) => {
                    methods.change(
                      {
                        operator: '',
                        field: '',
                        value: '',
                        syntheticEvent: ev
                      }
                    );
                  }">
                    Clear
                  </button>
                </div>
              </div>
          </template>
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
        {
          field: 'Name',
          type: 'string',
          filter: 'text',
          filterCell: 'filterSlotTemplate',
        },
        {
          field: 'Price',
          type: 'number',
          filter: 'numeric',
          filterCell: 'filterIsEqualTemplate',
        },
        {
          field: 'Location',
          type: 'string',
          filter: 'text',
          filterCell: 'filterSlotTemplate',
        },
        { field: 'Time', sortable: false, filterable: false },
        { field: 'Owned', filter: 'boolean', hidden: true },
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
      } if (this.reportType == 'active') {
        const jsonUserDataString = window.localStorage.getItem('userData') || '{}';
        let jsonUserData = { bugData: Object, fishData: Object, critterData: Object };
        jsonUserData = JSON.parse(jsonUserDataString);

        const { critterData } = jsonUserData;
        const targetData = [];
        for (let i = 0; i < critterData.length; i++) {
          const currentMonth = moment(new Date()).format('MMM');
          if (critterData[i][currentMonth] == '?') {
            if (critterData[i]['Start Time'] > critterData[i]['End Time']) {
              if (critterData[i]['Start Time'] < new Date().getHours() || critterData[i]['End Time'] > new Date().getHours()) {
                targetData.push(critterData[i]);
              }
            } else if (critterData[i]['Start Time'] < critterData[i]['End Time']) {
              if (critterData[i]['Start Time'] < new Date().getHours() && new Date().getHours() < critterData[i]['End Time']) {
                targetData.push(critterData[i]);
              }
            }
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
  @import '../styles/dark-theme.scss';
</style>
