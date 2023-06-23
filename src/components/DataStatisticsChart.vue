<template>
    <h2>Biểu đồ  : {{chartDetail.name}}</h2>
    <canvas ref="chartCanvas" class="canvas"></canvas>
</template>

<script>
import { ref, computed, watchEffect, watch } from 'vue';
import { useStore } from 'vuex';
import Chart from 'chart.js/auto';


export default {
  name: "DataStatisticsChart",
  props: {
    chartDetail: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    Chart.defaults.font.family = 'Arial , sans-serif';
    const chartCanvas = ref(null);
    const store = useStore();
    let chartInstance = null;
    const chartDetail = ref(props.chartDetail);
    
    const updateChart = () =>{
      const data = store.getters["sale/getData"];
      const label = store.getters["sale/getLabels"];

      if (chartCanvas.value) {
        if (chartInstance) {
          chartInstance.destroy();
        }

        const ctx = chartCanvas.value.getContext('2d');
        chartInstance = new Chart(ctx, {
          type: chartDetail.value.type,
          data: {
            labels: label,
            datasets: [{
              label: chartDetail.value.unit,
              data: data,
              backgroundColor: 'rgba(51,153,255,.8)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            defaultFontFamily: Chart.defaults.font.family,
            responsive: true,
            scales:{
              x:{
                display: true,
                ticks:{
                  font:{
                    size: 16
                  }
                },
                grid:{
                  display: false,
                },
              },
              y:{
                beginAtZero: true,
                display: true,
                ticks:{
                  callback: function (value) {
                    if (Number.isInteger(value)) {
                      if(chartDetail.value.unit === "VND"){
                        return new Intl.NumberFormat().format(value) + " VND";
                      }else if (chartDetail.value.unit === "Xe"){
                        return value + " Xe";
                      }
                    }
                  },
                  font:{
                    size: 16
                  }
                }
              }
            },
            plugins: {
              legend:{
                display: true,
                position: 'top',
                labels:{
                  font:{
                    size: 16
                  }
                }
              }
            }
          }
        })
    }}


    const chartData = computed(() => {
      return {
        data: store.getters["sale/getData"],
        label: store.getters["sale/getLabels"]
      };
    });

    watchEffect(() => {
      updateChart();
    });

    watch(chartData, () => {
      updateChart();
    });

    return {
      chartCanvas,
      chartData
    };
  }
};
</script>

<style lang="scss" scoped>
    .canvas {
    width: 95% !important;
    height: 500px !important;
    margin: 0 auto;
    background-color: white;
    border-radius: 10px;
    margin-bottom: 20px;
    padding-bottom: 20px;
    }
    h2{
      text-align: center;
      font-size: 23px;
      font-family: Arial, Helvetica, sans-serif;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
</style>