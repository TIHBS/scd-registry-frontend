<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">👀</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-content"
        aria-controls="navbar-content"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar-content">
        <div class="d-flex">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 nav-list">
            <li class="nav-item">
              <router-link class="nav-link" to="/register"
                >Register</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/scds">SCDs</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/settings"
                >Settings</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/power-gate"
                >Powergate</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/ipfs">IPFS</router-link>
            </li>
          </ul>
        </div>
      </div>
      <metamask-connect class="justify-content-end"></metamask-connect>
    </div>
  </nav>
</template>
<script setup lang="ts">
// @ts-ignore
import MetamaskConnect from "@/components/MetamaskConnect.vue";
// @ts-ignore
import StoreMockData from "@/components/StoreMockData.vue";
</script>
<style>
.nav-list {
  text-align: left;
}
</style>
