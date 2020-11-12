
<template>
  <div class="small2">
    <Bar-chart :chart-data="datacollection" :options="chartOptions"></Bar-chart>
  </div>
</template>

<script>
import BarChart from "/Users/ammaraldhahyani/Desktop/thesis-fado/fado/src/function-charts/BarChart.vue";
import {
  fado,
  normArrayToDisplay,
} from "/Users/ammaraldhahyani/Desktop/thesis-fado/fado/src/functions/fado.js";

export default {
  name: "layer0BarChart",
  components: {
    BarChart,
  },
  data() {
    return {
      datacollection: {},
      chartOptions: {
        
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              display: false,
              
              ticks: {
                max: 1.66,
              },
            },
            {
              display: true,
              ticks: {
                autoSkip: false,
                max: 3,
              },
            },
          ],
        },
        legend: {
          display: true,
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  methods: {
    fillData() {
      setInterval(() => {
        this.datacollection = {
          // Data for the y-axis of the chart
          labels: [
            0,
            1.57,
            1.58,
            1.59,
            1.6,
            1.61,
            1.62,
            1.63,
            1.64,
            1.65,
            1.66,
            3,
          ],
          datasets: [
            {
              label: "Norm",
              backgroundColor: "#f87979",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "#249EBF",
              barPercentage: 1.2,

              // Data for the x-axis of the chart
              data: [
                normArrayToDisplay[0],
                normArrayToDisplay[1],
                normArrayToDisplay[2],
                normArrayToDisplay[3],
                normArrayToDisplay[4],
                normArrayToDisplay[5],
                normArrayToDisplay[6],
                normArrayToDisplay[7],
                normArrayToDisplay[8],
                normArrayToDisplay[9],
                normArrayToDisplay[10],
              ],
            },
          ],
        };
      }, 1000);
    },
  },
  mounted() {
    this.fillData();
  },
};
</script>

<style>
.small2 {
  max-width: 300px;
}
</style>