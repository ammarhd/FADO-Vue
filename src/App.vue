<template>
  <v-app>
    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home.vue'

import * as d3 from 'd3'
import Data from "/Users/ammaraldhahyani/Desktop/thesis-fado/fado/public/Customers.json";

export default {
  name: 'App',
  components: {
    Home
  },
  data() {
    return {
      
      
      
    };
  },
  mounted() {
    console.log("App loaded");
    
  },
  methods: {
 
  }
  
};
</script>

<style>

main{
  background: #fafafa;
  
}

.v-btn__content{
  white-space: normal;
  flex: initial;
  display: inline-block;
}

.activebtn{
  background-color: rgb(59, 59, 206) !important;
  color: #fff !important;
}
.fab-btn{
  width: 100px !important;
  height: 100px  !important;
  margin-left: 19px;
  margin-bottom: 30px;
}
</style>
