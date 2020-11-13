

<style src="./style.css"></style>
<style src="./styleLayer0.css"></style>
<template src="./template.html"></template>

<script>

import { fado, normArrayToDisplay } from "../functions/fado.js";
import { popupLayer0 } from "../functions/layer0popup.js";
import {
  generateOutput,
  generateOutput2,
  generateOutput3,
  generateOutput4,
  txsCount1,
  txsCount2,
  txsCount3,
  txsCount4,
} from "../functions/generateOutputs.js";
import layer0LineChart from "../Charts/layer0LineChart.vue";
import layer0BarChart from "../Charts/layer0BarChart.vue";
import layer0TxChart from "../Charts/layer0TxChart.vue";


export default {
  components: {
    layer0BarChart,
    layer0LineChart,
    layer0TxChart,
  },

  name: "Home",
  data: () => ({
    layer0count: "",
    layer1count: "",
    layer2count: "",
    layer3count: "",
  }),

  methods: {
    flowSpeed() {
      setInterval(() => {
        for (var j = 0; j < 100; j++) {
          generateOutput();
          generateOutput2();
          generateOutput3();
          generateOutput4();
        }
      }, 1);
    },

    counter1() {
      var count1 = 0;
      var count11 = txsCount1 / 10;
      setInterval(() => {
        count1 = txsCount1 - count11;
        count11 = txsCount1;
        if (count1 > 140) {
          this.layer0count = "Processed" + " " + count1 / 10 + " " + "TXs/sec";
        } else if (count1 > 10) {
          this.layer0count = "Processed" + " " + count1 * 6 + " " + "TXs/min";
        } else {
          this.layer0count = "Processed" + " " + count1 * 36 + " " + "TXs/hour";
        }
      }, 10000);
    },

    counter2() {
      var count2 = 0;
      var count22 = txsCount2 / 20;
      setInterval(() => {
        count2 = txsCount2 - count22;
        count22 = txsCount2;
        if (count2 > 140) {
          this.layer1count = "Processed" + " " + count2 / 20 + " " + "TXs/sec";
        } else if (count2 > 10) {
          this.layer1count = "Processed" + " " + count2 * 3 + " " + "TXs/min";
        } else {
          this.layer1count = "Processed" + " " + count2 * 18 + " " + "TXs/hour";
        }
      }, 20000);
    },

    counter3() {
      var count3 = 0;
      var count33 = txsCount3 / 20;
      setInterval(() => {
        count3 = txsCount3 - count33;
        count33 = txsCount3;
        if (count3 > 140) {
          this.layer2count = "Processed" + " " + count3 / 20 + " " + "TXs/sec";
        } else if (count3 > 10) {
          this.layer2count = "Processed" + " " + count3 * 3 + " " + "TXs/min";
        } else {
          this.layer2count = "Processed" + " " + count3 * 18 + " " + "TXs/hour";
        }
      }, 20000);
    },

    counter4() {
      var count4 = 0;
      var count44 = txsCount4 / 20;
      setInterval(() => {
        count4 = txsCount4 - count44;
        count44 = txsCount4;
        if (count4 > 140) {
          this.layer3count = "Processed" + " " + count4 / 20 + " " + "TXs/sec";
        } else if (count4 > 10) {
          this.layer3count = "Processed" + " " + count4 * 3 + " " + "TXs/min";
        } else if (count4 > 0) {
          this.layer3count = "Processed" + " " + count4 * 18 + " " + "TXs/hour";
        } else {
          this.layer3count = "Processed" + " " + 18 + " " + "TXs/3hours";
        }
      }, 20000);
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
    
  },

  mounted() {
    this.flowSpeed();
    this.counter1();
    this.counter2();
    this.counter3();
    this.counter4();
    popupLayer0();
    
  },
};
</script>

