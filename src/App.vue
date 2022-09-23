<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  // eslint-disable-next-line no-undef
  name: "App",
});
</script>
<style scoped>
  a, div {
    text-decoration: none;
    list-style: none;
    font-size: 17px;
  }  
</style>
