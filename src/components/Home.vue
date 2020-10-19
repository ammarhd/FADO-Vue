<template>
  <v-container fluid pa-0>

    <v-row no-gutters class="my-3">
      <v-col cols="12" sm="12" class="text-center">
        <h1>FADO</h1>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" sm="12" class="navbar">
        <ul>
          <li class="ml-5"><a href="#">File</a></li>
          <li><a href="#">Setup</a></li>
          <li><a href="#">Extra</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </v-col>
    </v-row>

    <v-container>
      <v-row no-gutters>
        <v-col sm="12" md="5" class="text-center mt-5">
          <h2>Inflow</h2>
          <div id="inflow" class="mt-3 py-3">
            <div id="inflowTokens">
            </div>
          </div>
        </v-col>
        <v-col sm="12" md="7">

          <v-row no-gutters class="filters">
            <v-col sm="12" class="text-center mt-5 filters-buttons--holder">
            
              <v-btn elevation="2" :class="{ activebtn : activeBtn }" @click="setFilter('Q')">Expert System 1</v-btn>
              <v-btn elevation="2">Expert System 2</v-btn>
              <v-btn elevation="2">Expert System 3</v-btn>
              <v-btn elevation="2">Expert System 4</v-btn>
              <v-btn elevation="2">Expert System 5</v-btn>
              <v-btn elevation="2">Expert System 6</v-btn>
              <v-btn elevation="2">+</v-btn>


            </v-col>
          </v-row>

          <v-row no-gutters justify="center" align="center" class="fado-filters">
             <v-col sm="3" class="text-center">
               <v-btn elevation="2">Labeling</v-btn>
             </v-col>
             <v-col sm="3" class="text-center">

               <v-row no-gutters class="mt-5" >
                 <v-col sm="3" class="text-center">
                  <v-btn elevation="2" dark color="rgb(59, 59, 206)" class="fab-btn" large fab>FADO</v-btn>
                </v-col>
               </v-row>

               <v-row no-gutters class="ml-5">
                 <v-col sm="3" class="text-center">
                  <v-btn elevation="2">outstream</v-btn>
                </v-col>
               </v-row>

               

             </v-col>
             <v-col sm="2" class="text-center vertical-btns">
               <v-btn elevation="2">Audit</v-btn>
               <v-btn elevation="2">Incpect</v-btn>
               <v-btn elevation="2">Monitor</v-btn>
             </v-col>
          </v-row>


          <v-row no-gutters>
            <v-col sm="12" class="text-center">
              <h2>Outflow</h2>
              <div id="outflow" class="mt-3 py-3">
                <div id="outflowTokens"></div>
              </div>
            </v-col>
          </v-row>



        </v-col>
      </v-row>
    </v-container>


    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
       color="success"
    >
      <span v-if="activeBtn == true">Expert System 1 Activated</span>
      <span v-else>Expert System 1 Disabled</span>

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </v-container>
</template>

<script>
import * as d3 from 'd3'
import Data from "/Users/ammaraldhahyani/Desktop/thesis-fado/fado/public/Customers.json";

export default {
  name: 'Home',
  data: () => ({
    Tokens: [],
    FilteredTokens: [],
    filter: null,
    activeBtn: false,
    snackbar: false,
    timeout: 2000,

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

      let line = [sender + receiver, amount] + ',' + senderInfo + ',' + receiverInfo

      return line
    },
    

    generateToken(){
      setInterval(()=>{
        let newToken = this.generateTx()
        this.Tokens.push(newToken)
        this.printToken(newToken,'inflowTokens')
        if(this.filter == null){
          this.printToken(newToken,'outflowTokens')
        }
        else{
          if(newToken.includes(this.filter)){
            this.printToken(newToken,'outflowTokens')
          }
        }
      }, 200)
    },
    printToken(token, containerId){
      let newTokenDiv = document.createElement('div')
      let nodeToken = document.createTextNode(token)
      newTokenDiv.appendChild(nodeToken)
      let tokenContianer = document.getElementById(containerId)
      tokenContianer.insertBefore(newTokenDiv, tokenContianer.childNodes[0])
    },
    
    setFilter(value){
      if(this.filter == value){
        this.filter = null
      }else{
        this.filter = value
      }
      this.activeBtn = !this.activeBtn
      this.snackbar = true
    }
  },
  mounted () {
    console.log(this.generateTx())
    this.generateToken() 
   
  }
}
</script>

<style scoped>
.navbar{
  text-align: left;
  background: #1b1c46;
  padding-left: 30px;
  height: 55px;
}
.navbar ul{
  list-style: none;
  margin:0;
  padding:0;
}
.navbar ul li{
  display: inline-block;
}
.navbar a{
  display: inline-block;
  padding: 1px 15px;
  line-height: 55px;
  text-decoration: none;
  color:#fff;
}
#inflow,
#outflow{
  margin: auto 10px;
  overflow-y: hidden;
  border-radius: 10px;
  color: #777;
  background: #fff;
  margin-bottom: 50px;
}
#inflow{
  max-height: 765px;
  height: 765px;
}
#outflow{
  max-height: 300px;
  height: 300px;
  background: #fff;
}
.filters-buttons--holder{
  overflow-x: scroll;
  overflow-y: hidden;
  width: 100%;
  height: 80px;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.v-btn:not(.v-btn--round).v-size--default{
  max-width: 100px;
  height: 50px;
  margin-right: 10px;
  font-size: 12px;
}

.vertical-btns .v-btn{
  display: inline-block;
  margin-top: 15px;
  width: 120px;
}

.filters{
  margin-top: 48px;
}
.fado-filters{
  min-height: 322px;
  margin-bottom: 20px;
}


</style>
