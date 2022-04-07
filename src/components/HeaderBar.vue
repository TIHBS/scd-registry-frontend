<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">👀</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
      </ul>
    </div>
    <metamask-connect></metamask-connect>
  </nav>
</template>
<script lang="ts">
import { defineComponent } from "vue";
// @ts-ignore
import MetamaskConnect from "@/components/MetamaskConnect.vue";
export default defineComponent({
  methods: {},
  components: { MetamaskConnect },
});
</script>
<style></style>
