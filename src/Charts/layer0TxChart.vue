
<template>
  <div class="small3" id="lineC">
    <txBar-chart
      :options="chartOptions"
      :height="100"
      :chart-data="datacollection"
    ></txBar-chart>
  </div>
</template>

<script>
import txBarChart from "../function-charts/txBarChart.js";
import { y_vec, l0, m_t } from "../functions/FaDO.js";

export default {
  name: "layer0TxChart",
  components: {
    txBarChart,
  },
  data() {
    return {
      datacollection: {},
      txArray: Array.from(Array(45), () => 0.0),
      chartOptions: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                steps: 10,
                stepValue: 5,
                max: 0.006,
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
        for (let i = 0; i < 44; i++) {
          this.txArray[i] += y_vec[i];
        }
        this.datacollection = {
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
              label: "The average TX",
              backgroundColor: "rgb(244, 142, 223)",
              borderColor: "rgb(38, 2, 31)",
              pointBackgroundColor: "rgb(75, 7, 62)",
              borderWidth: 1,
              pointBorderColor: "rgb(75, 7, 62)",

              // Data for the x-axis of the chart
              data: [
                this.txArray[0] / l0,
                this.txArray[1] / l0,
                this.txArray[2] / l0,
                this.txArray[3] / l0,
                this.txArray[4] / l0,
                this.txArray[5] / l0,
                this.txArray[6] / l0,
                this.txArray[7] / l0,
                this.txArray[8] / l0,
                this.txArray[9] / l0,
                this.txArray[10] / l0,
                this.txArray[11] / l0,
                this.txArray[12] / l0,
                this.txArray[13] / l0,
                this.txArray[14] / l0,
                this.txArray[15] / l0,
                this.txArray[16] / l0,
                this.txArray[17] / l0,
                this.txArray[18] / l0,
                this.txArray[19] / l0,
                this.txArray[20] / l0,
                this.txArray[21] / l0,
                this.txArray[22] / l0,
                this.txArray[23] / l0,
                this.txArray[24] / l0,
                this.txArray[25] / l0,
                this.txArray[26] / l0,
                this.txArray[27] / l0,
                this.txArray[28] / l0,
                this.txArray[29] / l0,
                this.txArray[30] / l0,
                this.txArray[31] / l0,
                this.txArray[32] / l0,
                this.txArray[33] / l0,
                this.txArray[34] / l0,
                this.txArray[35] / l0,
                this.txArray[36] / l0,
                this.txArray[37] / l0,
                this.txArray[38] / l0,
                this.txArray[39] / l0,
                this.txArray[40] / l0,
                this.txArray[41] / l0,
                this.txArray[42] / l0,
                this.txArray[43] / l0,
                this.txArray[44] / l0,
              ],
            },
          ],
        };
      }, 10);
    },
  },
  mounted() {
    this.fillData();
  },
};
</script>

<style>
</style>