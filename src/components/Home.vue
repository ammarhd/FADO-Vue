

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
    txsCount33: 0,
    txsCount4: 0,
    txsCount44: 0,
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
        let newOutput = this.generateTx();
        this.printOutput(newOutput, "inflowLayer1");
        this.txsCount1 += 1
        if (newOutput[0] == 1) {
          this.layer2.push(newOutput);
          if (newOutput[1] == 1) {
            this.layer3.push(newOutput);
            if (newOutput[2] == 1) {
              this.layer4.push(newOutput);
            }
          }
        }
      }, 1);
    },

    generateOutput2() {
      let i = 0;
      setInterval(() => {
        if (this.layer2.length > i) {
          this.printOutput(this.layer2[i], "outflowLayer2");
          i++;
          this.txsCount2 += 1
        }
      }, 200);
    },

    generateOutput3() {
      let i = 0;
      setInterval(() => {
        if (this.layer3.length > i) {
          this.printOutput(this.layer3[i], "outflowLayer3");
          i++;
          this.txsCount3 += 1
        }
      }, 300);
    },

    generateOutput4() {
      let i = 0;
      setInterval(() => {
        if (this.layer4.length > i) {
          this.printOutput4(this.layer4[i], "outflowLayer4");
          i++;
          this.txsCount4 += 1
        }
      }, 500);
    },

    txsCount(){
      setInterval(() => {
        this.txsCount11 = this.txsCount1
        this.txsCount1 = 0

        this.txsCount22 = this.txsCount2
        this.txsCount2 = 0

        this.txsCount33 = this.txsCount3
        this.txsCount3 = 0

        this.txsCount44 = this.txsCount4
        this.txsCount4 = 0

      }, 1000);


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
        if ((allInfo[i] == 0) & (i != 5) & (i != 11)) {
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

      let menu2 = document.createElement("div");
      menu2.innerHTML = "Sender Id :" + " " + allInfo[0] + "<br/>";
      menu2.innerHTML += "Reciever Id :" + " " + allInfo[1] + "<br/>";
      menu2.innerHTML += "Amount :" + " " + allInfo[2] + "<br/>";
      menu2.innerHTML += "Sender Country :" + " " + allInfo[3] + "<br/>";
      menu2.innerHTML += "Sender Type Of Person:" + " " + allInfo[4] + "<br/>";
      menu2.innerHTML += "Sender Age Group :" + " " + allInfo[5] + "<br/>";
      menu2.innerHTML +=
        "Is Sender Politically Exposed :" + " " + allInfo[6] + "<br/>";
      menu2.innerHTML +=
        "Does Sender has Children :" + " " + allInfo[7] + "<br/>";
      menu2.innerHTML += "Is Sender Employed :" + " " + allInfo[8] + "<br/>";
      menu2.innerHTML += "Reciever Country :" + " " + allInfo[9] + "<br/>";
      menu2.innerHTML +=
        "Reciever Type Of Person :" + " " + allInfo[10] + "<br/>";
      menu2.innerHTML += "Reciever Age Group :" + " " + allInfo[11] + "<br/>";
      menu2.innerHTML +=
        "Is Reciever Politically Exposed :" + " " + allInfo[12] + "<br/>";
      menu2.innerHTML +=
        "Does Reciever has Children :" + " " + allInfo[13] + "<br/>";
      menu2.innerHTML += "Is Reciever Employed :" + " " + allInfo[14] + "<br/>";

      let menu3 = document.createElement("div");
      menu3.innerHTML = "<div id='dx'>Ok</div>";
      menu3.innerHTML += "<div>F</div>";

      menu2.classList.add("info-menu");
      menu3.classList.add("btn-menu");
      menu.classList.add("popup-menu");

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
        if (btnValue == "cancel") {
          menu.classList.remove("show-menu");
          return;
        }
        btn.innerHTML = `<span id="add${btnValue}">${btnValue}</span>${token}`;
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
    console.log(this.layer2[1]);
  },
};
</script>

