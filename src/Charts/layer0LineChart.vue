
<template>
  <div class="small" id="lineC">
    <Line-chart
      :options="chartOptions"
      :height="100"
      :chart-data="datacollection2"
    ></Line-chart>
  </div>
</template>

<script>
import LineChart from "../function-charts/LineChart.js";
import { w } from "../functions/FaDO.js";

export default {
  name: "layer0LineChart",
  components: {
    LineChart,
  },
  data() {
    return {
      datacollection2: {},
      chartOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 5,
                max: 0.4,
              },
              gridLines: {
                display: true,
              },
            },
          ],
          xAxes: [
            {
              display: true,
              
              gridLines: {
                display: true,
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
        this.datacollection2 = {
          // Data for the y-axis of the chart
          labels: [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
          ],
          datasets: [
            {
              label: "Current values of W",
              backgroundColor: "rgb(168, 233, 240)",
              borderColor: "rgb(12, 70, 77)",
              borderWidth: 1,
              // Data for the x-axis of the chart
              data: [
                w[0],
                w[1],
                w[2],
                w[3],
                w[4],
                w[5],
                w[6],
                w[7],
                w[8],
                w[9],
                w[10],
                w[11],
                w[12],
                w[13],
                w[14],
                w[15],
                w[16],
                w[17],
                w[18],
                w[19],
                w[20],
                w[21],
                w[22],
                w[23],
                w[24],
                w[25],
                w[26],
                w[27],
                w[28],
                w[29],
                w[30],
                w[31],
                w[32],
                w[33],
                w[34],
                w[35],
                w[36],
                w[37],
                w[38],
                w[39],
                w[40],
                w[41],
                w[42],
                w[43],
                w[44],
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
</style>