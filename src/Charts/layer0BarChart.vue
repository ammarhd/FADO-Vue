
<template>
  <div class="small2" id="lineC">
    <Bar-chart
      :options="chartOptions"
      :height="100"
      :chart-data="datacollection"
    ></Bar-chart>
  </div>
</template>

<script>
import BarChart from "../function-charts/BarChart.js";
import { fado, m_t, normArrayToDisplay } from "../functions/FaDO.js";
import "chartjs-plugin-annotation";

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
                steps: 10,
                stepValue: 5,
                max: 700,
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
              gridLines: {
                display: true,
                color: [
                  "wite",
                  "white",
                  "white",
                  "white",
                  "white",
                  "white",
                  "white",
                  "white",
                  "white",
                  "red",
                  "white",
                  "white",
                ],
                borderDash: [15, 3, 3, 3],
              },
            },
          ],
        },
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
              label: "Norm of the last 1000 TXs",
              backgroundColor: [
                "rgba(118, 190, 254, 0.529)",
                "rgba(118, 190, 254, 0.529)",
                "rgba(118, 190, 254, 0.529)",
                "rgba(118, 190, 254, 0.529)",
                "rgba(118, 190, 254, 0.529)",
                "rgba(118, 190, 254, 0.529)",
                "rgba(118, 190, 254, 0.529)",
                "rgba(118, 190, 254, 0.529)",
                "rgba(118, 190, 254, 0.529)",
                "rgba(247, 123, 123, 0.632)",
                "rgba(247, 123, 123, 0.632)",
              ],
              borderColor: "rgb(10, 41, 87)",
              pointBackgroundColor: "rgb(132, 180, 252)",
              borderWidth: 0,
              pointBorderColor: "rgb(132, 180, 252)",
              barPercentage: 1.22,

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
  padding: 10px;
}
</style>