<template>
  <div class="store-mock-data">
    <div
      v-if="waiting"
      class="spinner-border btn-outline-success"
      role="status"
    ></div>
    <div v-else>
      <button
        v-if="isMetamaskSupported"
        class="btn btn-outline-success my-2 my-sm-0"
        type="button"
        @click="storeMockData"
      >
        Store Mock Data
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { checkIfMetamaskIsInstalled } from "@/ethereum/Metamask";
import { ethereumConnector } from "@/ethereum/EthereumConnector";

const isMetamaskSupported = ref(false);
const waiting = ref(false);

onMounted(() => (isMetamaskSupported.value = checkIfMetamaskIsInstalled()));

async function storeMockData() {
  waiting.value = true;
  try {
    const transaction = await ethereumConnector.storeMock();
    await transaction.wait();
  } finally {
    waiting.value = false;
  }
}
</script>
<style>
.store-mock-data {
  padding-right: 20px;
}
</style>
