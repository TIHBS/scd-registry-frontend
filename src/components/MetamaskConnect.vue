<template>
  <span v-if="isLoggedIn" class="navbar-text">{{ computedAddress }}</span>
  <div
    v-else-if="waiting"
    class="spinner-border btn-outline-success"
    role="status"
  ></div>
  <div v-else>
    <button
      v-if="isMetamaskSupported"
      class="btn btn-outline-success my-2 my-sm-0"
      @click="connectWallet"
      type="button"
    >
      Connect Metamask
    </button>
    <span v-else class="navbar-text">Install Metamask</span>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Signer } from "ethers";
import {
  checkIfMetamaskIsInstalled,
  connectMetamask,
  truncateAddress,
} from "@/ethereum/Metamask";

const isMetamaskSupported = ref(false);
const signer = ref<Signer>();
const address = ref("");
const isLoggedIn = ref(false);
const waiting = ref(false);
onMounted(
  () => (isMetamaskSupported.value = checkIfMetamaskIsInstalled(window))
);

async function connectWallet() {
  connectMetamask(window)
    .then((result) => {
      [signer.value, address.value] = result;
      isLoggedIn.value = address.value != "";
    })
    .catch((err) => {})
    .finally(() => (waiting.value = false));
  waiting.value = true;
}

const computedAddress = computed(() => truncateAddress(address.value));
</script>
<style></style>
