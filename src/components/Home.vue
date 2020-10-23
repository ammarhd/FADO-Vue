

<style src="./style.css"></style>
<template src="./template.html"></template>

<script>

import Data from "/Users/ammaraldhahyani/Desktop/thesis-fado/fado/public/Customers.json";

export default {
  name: 'Home',
  data: () => ({
    layer2: [],
    layer3: [],
    layer4: [],
    
  }),
 
  methods: {

    randomItem(items){
      return items[Math.floor(Math.random()*items.length)];
    },
    keys(obj) {
      const result = [];
      for (const property in obj) { result.push( obj[property]); }
      return result;
    },

    generateTx (){
      var weighted = require('weighted')
      var randomNormal = require('random-normal')
      var abs = require( 'math-abs' )
      let sendersIndex = []
      let receiversIndex = []
      let l = Data.length
      let items = []
      let sender = 0
      let receiver = 0
      

      let international = weighted.select([0,1],[0.98,0.02])
      if( international == 1){
        let senderCountryCd = weighted.select(['LV', 'BE', 'any'],[0.5, 0.4, 0.1])
        if( senderCountryCd == 'any' ){
          for(let i = 0; i < l; i++ ){
            if( Data[i].Country != 'LV' & Data[i].Country != 'BE' ){
              sendersIndex.push(i)
            }
          }
          items = sendersIndex
          sender = this.randomItem(items)
          for(let i = 0; i < l; i++ ){
            if( Data[i] != sender){
              receiversIndex.push(i)
            }
          }
          items = receiversIndex
          receiver = this.randomItem(items)
        }   
        else{
          for(let i = 0; i < l; i++ ){
            if( Data[i].Country == senderCountryCd ){
              sendersIndex.push(i)
            }
            else{
              if( senderCountryCd == 'LV' & Data[i].Country == 'DE'){
              receiversIndex.push(i)
              }
              else if( senderCountryCd == 'BE' & Data[i].Country == 'IT'){
              receiversIndex.push(i)
              }
            }
          }
          items = sendersIndex
          sender = this.randomItem(items)
          items = receiversIndex
          receiver = this.randomItem(items)
        }
      }
      else {
        for( let i = 0; i < l; i++ ){
          sendersIndex.push(i)
        }
        items = sendersIndex
        sender = this.randomItem(items)
        for( let i = 0; i < l; i++ ){
          if(Data[i].Country == Data[sender].Country){
            receiversIndex.push(i)
          }
        }
        items = receiversIndex
        receiver = this.randomItem(items)
      }
      let mean = weighted.select([100, 500, 1000, 5000, 20000, 50000, 100000],[0.5, 0.2, 0.15, 0.05, 0.05, 0.025, 0.025])
      let std = mean*0.5
      let amount = abs(randomNormal({mean, std}))

      let senderInfo = this.keys(Data[sender])
      let receiverInfo = this.keys(Data[receiver])

      let line = [sender , receiver , amount] + ',' + senderInfo + ',' + receiverInfo

      return line
    },
    

    generateOutput(){
      
      setInterval(()=>{
        let newOutput = this.generateTx()
        this.printOutput(newOutput,'inflowLayer1')
        if(newOutput[0] == 1){
          this.layer2.push(newOutput)
        }
        else if(newOutput[1] == 1){
          this.layer3.push(newOutput)
        }
        else if(newOutput[2] == 1){
          this.layer4.push(newOutput)
        }
        
      }, 10)
      
    },

    generateOutput2(){
      let i = 0
      setInterval(()=>{
        if(this.layer2.length > i & this.layer2.length > 30){
          this.printOutput(this.layer2[i],'outflowLayer2')
          i++
        }
      }, 200)
    },

    generateOutput3(){
      let i = 0
      setInterval(()=>{
        if(this.layer3.length > i & this.layer3.length > 30){
          this.printOutput(this.layer3[i],'outflowLayer3')
          i++
        }
      }, 400) 
    },

    generateOutput4(){
      let i = 0
      setInterval(()=>{
        if(this.layer4.length > i & this.layer4.length > 30){
          this.printOutput(this.layer4[i],'outflowLayer4')
          i++
        }
      }, 800)
    },



    printOutput(token, containerId){
      let newTokenDiv = document.createElement('div')
      let nodeToken = document.createTextNode(token)
      newTokenDiv.appendChild(nodeToken)
      let tokenContianer = document.getElementById(containerId)
      tokenContianer.insertBefore(newTokenDiv, tokenContianer.childNodes[0])
    },
    

   

  },
  mounted () {
    console.log(this.generateTx())
    
    this.generateOutput()
    this.generateOutput2()
    this.generateOutput3()
    this.generateOutput4()
    
    
    console.log(this.layer2[1])
    
   
    
   
  }
}
</script>

