<template>
  <v-app>
    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home.vue'


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



</style>
