<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">👀</a>
    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/register">Register</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/scds">SCDs</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/settings">Settings</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/power-gate">Powergate</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/ipfs">IPFS</router-link>
        </li>
      </ul>
    </div>
    <store-mock-data></store-mock-data>
    <metamask-connect></metamask-connect>
  </nav>
</template>
<script setup lang="ts">
// @ts-ignore
import MetamaskConnect from "@/components/MetamaskConnect.vue";
// @ts-ignore
import StoreMockData from "@/components/StoreMockData.vue";
</script>
<style></style>
