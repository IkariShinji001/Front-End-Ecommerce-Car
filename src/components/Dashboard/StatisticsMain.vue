<template>
      <v-select 
        class="select-chart-options"
        label=""
        :items="selectChartOptions"
        v-model="selectedOption"
        @update:modelValue="getDataChartByOptions"
      ></v-select>
      <Chart v-if="isDataLoaded" v-bind:chartDetail="chartDetail"></Chart>
      <TableData></TableData>
</template>

<script>
  import TableData from "./TableData.vue";
  import Chart from "../DataStatisticsChart.vue"
  import { useStore } from 'vuex';
  import { onBeforeMount, ref, computed, reactive } from 'vue';

    export default {
        name: "StatisticsMain",
        components: {
            Chart,
            TableData
        },
      setup(){
            const chartOptions = [{
              name: "Lợi nhuận theo tháng",
              method: "getProfitByMonths",
              unit: "VND",
              type: "bar"
              },
              {
              name: "Số xe bán được theo tháng",
              method:"getCarSoldByMonths",
              unit: "Xe",
              type: "line"
            }]  
          const store = useStore();
          const selectedOption = ref("Lợi nhuận theo tháng");
          const chartDetail = reactive({
            name: "Lợi nhuận theo tháng",
            method: "getProfitByMonths",
            unit: "VND",
            type:"bar"
          });
          const isDataLoaded = ref(false);

          onBeforeMount( async () =>{
            await store.dispatch("sale/getProfitByMonths");

            isDataLoaded.value = true;
          })

          const selectChartOptions = computed(() => {
            const selectChartOptions =  chartOptions.map(option => option.name);
            return selectChartOptions;
          })

          
          const getDataChartByOptions = () => {
            chartOptions.forEach(async option => {
              if(option.name === selectedOption.value){
                await store.dispatch("sale/" + option.method);
                Object.assign(chartDetail, option);
              }
            })
          }

          return {
            selectedOption,
            chartDetail,
            selectChartOptions,
            getDataChartByOptions, 
            isDataLoaded,
            chartOptions
          }
        }
    }
</script>


<style lang="scss" scoped>
  .select-chart-options{
    display: block !important;
    width: 300px !important;
    margin-bottom: 20px;
    background-color: white;
    color: black
  }
</style>

