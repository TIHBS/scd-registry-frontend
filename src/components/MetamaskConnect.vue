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
import {
  checkIfMetamaskIsInstalled,
  connectMetamask,
  truncateAddress,
} from "@/ethereum/Metamask";
import { ethereumConnector } from "@/ethereum/EthereumConnector";

const isMetamaskSupported = ref(false);
const address = ref("");
const isLoggedIn = ref(false);
const waiting = ref(false);

onMounted(
  () => (isMetamaskSupported.value = checkIfMetamaskIsInstalled(window))
);

async function connectWallet() {
  connectMetamask(window)
    .then((result) => {
      const [signer, signerAddress] = result;
      isLoggedIn.value = signerAddress != "";
      if (isLoggedIn.value) {
        ethereumConnector.setSigner(signer);
        address.value = signerAddress;
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => (waiting.value = false));
  waiting.value = true;
}

const computedAddress = computed(() => truncateAddress(address.value));
</script>
<style></style>
