

<style src="./style.css"></style>
<template src="./template.html"></template>

<script>
import Data from "/Users/ammaraldhahyani/Desktop/thesis-fado/fado/public/Customers.json";

export default {
  name: "Home",
  data: () => ({
    layer2: [],
    layer3: [],
    layer4: [],
    txsCount1: 0,
    txsCount11: 0,
    txsCount2: 0,
    txsCount22: 0,
    txsCount3: 0,
    txsCount33: 10,
    txsCount4: 0,
    txsCount44: 60,
  }),

  methods: {
    randomItem(items) {
      return items[Math.floor(Math.random() * items.length)];
    },
    keys(obj) {
      const result = [];
      for (const property in obj) {
        result.push(obj[property]);
      }
      return result;
    },

    generateTx() {
      var weighted = require("weighted");
      var randomNormal = require("random-normal");
      var abs = require("math-abs");
      let sendersIndex = [];
      let receiversIndex = [];
      let l = Data.length;
      let items = [];
      let sender = 0;
      let receiver = 0;

      let international = weighted.select([0, 1], [0.98, 0.02]);
      if (international == 1) {
        let senderCountryCd = weighted.select(
          ["LV", "BE", "any"],
          [0.5, 0.4, 0.1]
        );
        if (senderCountryCd == "any") {
          for (let i = 0; i < l; i++) {
            if ((Data[i].Country != "LV") & (Data[i].Country != "BE")) {
              sendersIndex.push(i);
            }
          }
          items = sendersIndex;
          sender = this.randomItem(items);
          for (let i = 0; i < l; i++) {
            if (Data[i] != sender) {
              receiversIndex.push(i);
            }
          }
          items = receiversIndex;
          receiver = this.randomItem(items);
        } else {
          for (let i = 0; i < l; i++) {
            if (Data[i].Country == senderCountryCd) {
              sendersIndex.push(i);
            } else {
              if ((senderCountryCd == "LV") & (Data[i].Country == "DE")) {
                receiversIndex.push(i);
              } else if (
                (senderCountryCd == "BE") &
                (Data[i].Country == "IT")
              ) {
                receiversIndex.push(i);
              }
            }
          }
          items = sendersIndex;
          sender = this.randomItem(items);
          items = receiversIndex;
          receiver = this.randomItem(items);
        }
      } else {
        for (let i = 0; i < l; i++) {
          sendersIndex.push(i);
        }
        items = sendersIndex;
        sender = this.randomItem(items);
        for (let i = 0; i < l; i++) {
          if (Data[i].Country == Data[sender].Country) {
            receiversIndex.push(i);
          }
        }
        items = receiversIndex;
        receiver = this.randomItem(items);
      }
      let mean = weighted.select(
        [100, 500, 1000, 5000, 20000, 50000, 100000],
        [0.5, 0.2, 0.15, 0.05, 0.05, 0.025, 0.025]
      );
      let std = mean * 0.5;
      let amount = abs(randomNormal({ mean, std }));

      let senderInfo = this.keys(Data[sender]);
      let receiverInfo = this.keys(Data[receiver]);

      let line =
        [sender, receiver, amount] + "," + senderInfo + "," + receiverInfo;

      return line;
    },

    generateOutput() {
      setInterval(() => {
        for (var i = 0; i < 10; i++) {
          let newOutput = this.generateTx();
          this.printOutput(newOutput, "inflowLayer1");
          this.txsCount1 += 1;
          if (newOutput[0] == 1) {
            this.layer2.push(newOutput);
            if (newOutput[1] == 1) {
              this.layer3.push(newOutput);
              if (newOutput[2] == 1) {
                this.layer4.push(newOutput);
              }
            }
          }
        }
      }, 1);
    },

    generateOutput2() {
      let i = 0;
      setInterval(() => {
        for (var j = 0; j < 10; j++) {
          if (this.layer2.length > i) {
            this.printOutput(this.layer2[i], "outflowLayer2");
            i++;
            this.txsCount2 += 1;
          }
        }
      }, 200);
    },

    generateOutput3() {
      let i = 0;
      setInterval(() => {
        for (var j = 0; j < 10; j++) {
          if (this.layer3.length > i) {
            this.printOutput(this.layer3[i], "outflowLayer3");
            i++;
            this.txsCount3 += 1;
          }
        }
      }, 300);
    },

    generateOutput4() {
      let i = 0;
      setInterval(() => {
        for (var j = 0; j < 10; j++) {
          if (this.layer4.length > i) {
            this.printOutput4(this.layer4[i], "outflowLayer4");
            i++;
            this.txsCount4 += 1;
          }
        }
      }, 1000);
    },

    txsCount() {
      setInterval(() => {
        this.txsCount11 = this.txsCount1;
        this.txsCount1 = 0;

        this.txsCount22 = this.txsCount2;
        this.txsCount2 = 0;
      }, 1000);
    },

    txsCountMin() {
      setInterval(() => {
        this.txsCount33 = this.txsCount3;
        this.txsCount3 = 0;
      }, 60000);
    },

    txsCountHour() {
      setInterval(() => {
        this.txsCount44 = this.txsCount4;
        this.txsCount44 *= 30;
        this.txsCount4 = 0;
      }, 120000);
    },

    printOutput(token, containerId) {
      let newTokenDiv = document.createElement("div");
      let nodeToken = document.createTextNode(token);
      newTokenDiv.appendChild(nodeToken);
      let tokenContianer = document.getElementById(containerId);
      tokenContianer.insertBefore(newTokenDiv, tokenContianer.childNodes[0]);
    },

    printOutput4(token, containerId) {
      var allInfo = [];
      var partInfo = [];
      var loadInfo = [];
      for (let i = 0; i < token.length; i++) {
        if (token[i] == ",") {
          loadInfo = partInfo;
          partInfo = [];
          allInfo.push(loadInfo);
          i++;
        }
        partInfo += token[i];
        if (i == token.length - 1) {
          allInfo.push(partInfo);
        }
      }

      for (let i = 0; i < allInfo.length; i++) {
        if (i == 5 || i == 11) {
          if (allInfo[i] == 1) {
            allInfo[i] = "15 - 24";
          } else if (allInfo[i] == 2) {
            allInfo[i] = "25 - 49";
          } else if (allInfo[i] == 3) {
            allInfo[i] = "50 - 64";
          } else if (allInfo[i] == 4) {
            allInfo[i] = "65 - 79";
          } else if (allInfo[i] == 5) {
            allInfo[i] = "80 - Above";
          } else if (i == 5) {
            if (allInfo[i] == 0) {
              allInfo[5] = '-'
              allInfo[6] = '-'
              allInfo[7] = '-'
              allInfo[8] = '-'
            }
          } else if (i == 11) {
            if (allInfo[i] == 0) {
              allInfo[11] = '-'
              allInfo[12] = '-'
              allInfo[13] = '-'
              allInfo[14] = '-'
            }
          }
        } else if ((allInfo[i] == 0) & (i != 5) & (i != 11)) {
          allInfo[i] = "No";
        } else if ((allInfo[i] == 1) & (i != 5) & (i != 11)) {
          allInfo[i] = "Yes";
        }
      }

      let newTokenDiv = document.createElement("div");
      let s = "?";
      let line = token;
      let btn = document.createElement("button");
      //btn.setAttribute('type', 'button')
      btn.innerHTML = `<span id="normal">${s}</span>${token}`;
      btn.setAttribute("style", "white-space: nowrap;");
      //tn.setAttribute('value', s + token)

      let menu = document.createElement("div");
      let menu_t = document.createElement("div");

      menu_t.innerHTML = "AMOUNT" + "&ensp;" + "&ensp;" + allInfo[2];

      let menu2 = document.createElement("div");
      let menu2l = document.createElement("div");
      let menu2r = document.createElement("div");

      let menu2l_t = document.createElement("div");
      let menu2l_b = document.createElement("div");

      let menu2rl = document.createElement("div");
      let menu2rl_t = document.createElement("div");
      let menu2rl_b = document.createElement("div");

      let menu2rr = document.createElement("div");
      let menu2rr_t = document.createElement("div");
      let menu2rr_b = document.createElement("div");

      menu2l_t.innerHTML = "INFORMATION" + "<br/>";

      menu2l_b.innerHTML = "ID" + "<br/>";
      menu2l_b.innerHTML += "Country" + "<br/>";
      menu2l_b.innerHTML += "Type Of Person" + "<br/>";
      menu2l_b.innerHTML += "Age Group" + "<br/>";
      menu2l_b.innerHTML += "Is Politically Exposed" + "<br/>";
      menu2l_b.innerHTML += "Has Children" + "<br/>";
      menu2l_b.innerHTML += "Is Employed" + "<br/>";

      menu2rl_t.innerHTML = "SENDER" + "<br/>";
      menu2rr_t.innerHTML = "RECEIVER" + "<br/>";

      menu2rl_b.innerHTML = allInfo[0] + "<br/>";
      menu2rl_b.innerHTML += allInfo[3] + "<br/>";
      menu2rl_b.innerHTML += allInfo[4] + "<br/>";
      menu2rl_b.innerHTML += allInfo[5] + "<br/>";
      menu2rl_b.innerHTML += allInfo[6] + "<br/>";
      menu2rl_b.innerHTML += allInfo[7] + "<br/>";
      menu2rl_b.innerHTML += allInfo[8] + "<br/>";
      menu2rr_b.innerHTML += allInfo[1] + "<br/>";
      menu2rr_b.innerHTML += allInfo[9] + "<br/>";
      menu2rr_b.innerHTML += allInfo[10] + "<br/>";
      menu2rr_b.innerHTML += allInfo[11] + "<br/>";
      menu2rr_b.innerHTML += allInfo[12] + "<br/>";
      menu2rr_b.innerHTML += allInfo[13] + "<br/>";
      menu2rr_b.innerHTML += allInfo[14] + "<br/>";

      let menu3 = document.createElement("div");
      menu3.innerHTML = "<div id='dx'>Normal</div>";
      menu3.innerHTML += "<div>Fraud</div>";
      menu3.innerHTML += "<div id='canc'>Cancel</div>";

      menu2l_b.classList.add("lBot");

      menu2rl_t.classList.add("topp");
      menu2rr_t.classList.add("topp");
      menu2l_t.classList.add("topp");

      menu2rl.classList.add("rl-col");
      menu2rr.classList.add("rr-col");
      menu2l.classList.add("left-col");
      menu2r.classList.add("right-col");
      menu2.classList.add("info-menu");
      menu3.classList.add("btn-menu");
      menu_t.classList.add("amount");
      menu.classList.add("popup-menu");

      menu2l.appendChild(menu2l_t);
      menu2l.appendChild(menu2l_b);
      menu2rl.appendChild(menu2rl_t);
      menu2rl.appendChild(menu2rl_b);
      menu2rr.appendChild(menu2rr_t);
      menu2rr.appendChild(menu2rr_b);

      menu2r.appendChild(menu2rl);
      menu2r.appendChild(menu2rr);
      menu2.appendChild(menu2l);
      menu2.appendChild(menu2r);

      menu.appendChild(menu_t);
      menu.appendChild(menu2);
      menu.appendChild(menu3);
      newTokenDiv.appendChild(btn);
      newTokenDiv.appendChild(menu);

      btn.addEventListener("click", (e) => {
        let menus = document.getElementsByClassName("show-menu");
        if (menus.length > 0) {
          for (var i = 0; i < menus.length; i++) {
            menus[i].classList.remove("show-menu");
          }
        }

        menu.classList.toggle("show-menu");
        //console.log(e.target)
      });

      menu3.addEventListener("click", (e) => {
        let btnValue = e.target.innerHTML;
        if (btnValue == "Cancel") {
          menu.classList.remove("show-menu");
          return;
        } 
        btn.innerHTML = `<span id="add${btnValue}">${btnValue[0]}</span>${token}`;
        menu.classList.remove("show-menu");
        //btn.setAttribute('value', e.target.innerHTML + token )
      });

      let tokenContianer = document.getElementById(containerId);
      tokenContianer.insertBefore(newTokenDiv, tokenContianer.childNodes[0]);
    },
  },
  mounted() {
    this.generateOutput();
    this.generateOutput2();
    this.generateOutput3();
    this.generateOutput4();
    this.txsCount();
    this.txsCountMin();
    this.txsCountHour();
    console.log(this.layer2[1]);
  },
};
</script>

