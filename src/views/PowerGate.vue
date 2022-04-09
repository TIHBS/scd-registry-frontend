<template>
  <div class="power-gate">
    <h1>This is the Powergate page</h1>
    <file-upload></file-upload>
    <br />
    <button
      @click="fetchWalletAddress"
      type="button"
      class="btn btn-outline-primary button-margin"
    >
      Fetch wallet address
    </button>
    <button
      @click="createUser"
      type="button"
      class="btn btn-outline-primary button-margin"
    >
      Create user
    </button>
    <button
      @click="fetchBuildInfo"
      type="button"
      class="btn btn-outline-primary button-margin"
    >
      Fetch build info
    </button>
    <br />
    <br />
    <span> {{ displayedUser }}</span>
    <span> {{ displayedBuildInfo }}</span>

    <li
      v-for="item in displayedInfo"
      :key="uniqueId(item)"
      class="row list-group-item justify-content-between align-items-start"
    >
      <span>{{ item }}</span>
    </li>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { powergateConnector } from "@/powergate/PowergateConnector";
import uniqueId from "lodash.uniqueid";
// @ts-ignore
import FileUpload from "@/components/FileUpload.vue";

const displayedInfo = ref<string[]>([]);
const displayedUser = ref("");
const displayedBuildInfo = ref("");
let file: File | null = null;
let info: string[];

async function fetchBuildInfo() {
  displayedBuildInfo.value = await powergateConnector.fetchBuildInfo();
}

async function createUser() {
  displayedUser.value = await powergateConnector.createUser();
}

async function fetchWalletAddress() {
  info = await powergateConnector.fetchWalletAddress();
  displayedInfo.value = info;
}
</script>

<style>
.button-margin {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
