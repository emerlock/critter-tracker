<template>
  <div class="table">
    <Grid :style="{'margin':'0 auto'}"
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
                          placeholder="search"
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
                </div>
              </div>
          </template>
          <template v-slot:filterIsEqualTemplate="{props, methods}">
              <div class="k-filtercell">
                <div class="k-filtercell-wrapper">
                  <input  type="text"
                          class="k-textbox"
                          placeholder="filter"
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
                </div>
              </div>
          </template>
          <template v-slot:filterTimeTemplate="{props, methods}">
              <div class="k-filtercell">
                <div class="k-filtercell-wrapper">
                  <input  type="text"
                          class="k-textbox"
                          placeholder="filter"
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
    const columns = [
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
      {
        title: 'Time Available',
        children: [
          { field: 'Start Time', cell: this.customStartTime, filterCell: 'filterTimeTemplate' },
          { field: 'End Time', cell: this.customEndTime, filterCell: 'filterTimeTemplate' },
        ],
      },
      {
        field: 'Owned',
        filter: 'boolean',
        hidden: true,
      },
    ];
    if (this.$isMobile()) {
      columns.forEach((item) => {
        item.width = '200px';
      });
    }

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
      columns,
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
    customStartTime(h, tdElement, props, listeners) {
      let startTime = props.dataItem['Start Time'];

      if (startTime > 12) {
        startTime -= 12;
        startTime += ' PM';
      } else if (startTime === 0) {
        startTime = '12 AM';
      } else {
        startTime += ' AM';
      }
      return h('td', {
        on: {
          click(e) {
            listeners.custom(e);
          },
        },
      }, [`${startTime}`]);
    },
    customEndTime(h, tdElement, props, listeners) {
      let endTime = props.dataItem['End Time'];

      if (endTime === 24) {
        endTime = '12 AM';
      } else if (endTime > 12) {
        endTime -= 12;
        endTime += ' PM';
      } else {
        endTime += ' AM';
      }
      return h('td', {
        on: {
          click(e) {
            listeners.custom(e);
          },
        },
      }, [`${endTime}`]);
    },
    sortChangeHandler(e) {
      this.sort = e.sort;
    },
    filterChange(ev) {
      this.filter = ev.filter;
    },
    createData() {
      let returnData = {};
      const targetData = [];

      const jsonUserDataString = window.localStorage.getItem('userData') || '{}';
      const jsonUserData = JSON.parse(jsonUserDataString);
      const { critterData } = jsonUserData;

      switch (this.reportType) {
        case 'leaving':
          critterData.forEach((item) => {
            const currentMonth = moment(new Date()).format('MMM');
            const nextMonth = moment(new Date()).add(1, 'months').format('MMM');
            if (item[currentMonth] === '?' && item[nextMonth] === '-') {
              targetData.push(item);
            }
          });

          returnData = targetData;
          break;
        case 'new':
          critterData.forEach((item) => {
            const currentMonth = moment(new Date()).format('MMM');
            const lastMonth = moment(new Date()).add(-1, 'months').format('MMM');
            if (item[currentMonth] === '?' && item[lastMonth] === '-') {
              targetData.push(item);
            }
          });

          returnData = targetData;
          break;
        case 'active':
          critterData.forEach((item) => {
            const currentMonth = moment(new Date()).format('MMM');
            if (item[currentMonth] === '?') {
              if (item['Start Time'] > item['End Time']) {
                if (item['Start Time'] < new Date().getHours() || item['End Time'] > new Date().getHours()) {
                  targetData.push(item);
                }
              } else if (item['Start Time'] < item['End Time']) {
                if (item['Start Time'] < new Date().getHours() && new Date().getHours() < item['End Time']) {
                  targetData.push(item);
                }
              }
            }
          });

          returnData = targetData;
          break;
        default:
          returnData = jsonUserData.critterData;
          break;
      }

      return returnData;
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
