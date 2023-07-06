<template>
      <HeadTitle :title="'Thống Kê'"></HeadTitle>
      <v-select 
        class="select-chart-options ml-8  "
        :items="selectChartOptions"
        variant="outlined"
        v-model="selectedOption"
        @update:modelValue="getDataChartByOptions"
        hide-details="true"
      ></v-select>
      <Chart v-if="isDataLoaded" v-bind:chartDetail="chartDetail"></Chart>
      <TableData></TableData>
</template>

<script>
  import TableData from "@/components/Dashboard/TableData.vue";
  import HeadTitle from "@/components/Dashboard/HeadTitle.vue";
  import Chart from "@/components/DataStatisticsChart.vue"
  import { useStore } from 'vuex';
  import { onBeforeMount, ref, computed, reactive } from 'vue';

    export default {
        name: "StatisticsMain",
        components: {
            Chart,
            TableData,
            HeadTitle
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
          const selectedOption = ref("Lợi nhuận theo tháng");
          const store = useStore();
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
    margin-top: 50px;
    margin-bottom: 20px;
    background-color: white;
    color: black
  }
</style>

