<template>
  <header-bar></header-bar>
  <br />
  <div class="viewport"><router-view /></div>
</template>
<script setup lang="ts">
// @ts-ignore
import HeaderBar from "@/components/HeaderBar.vue";
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 20px;
}

nav a {
  font-weight: bold;
}

.viewport {
  margin-left: 15%;
  margin-right: 15%;
}
</style>
