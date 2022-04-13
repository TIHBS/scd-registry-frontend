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
      type="button"
      @click="connectWallet"
    >
      Connect Metamask
    </button>
    <span v-else class="navbar-text">Install Metamask</span>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  checkIfLoggedIn,
  checkIfMetamaskIsInstalled,
  connectMetamask,
} from "@/ethereum/Metamask";
import { ethereumConnector } from "@/ethereum/EthereumConnector";
import "@/util/Window";
import { truncateString } from "@/util/TruncateString";

const isMetamaskSupported = ref(false);
const address = ref("");
const isLoggedIn = ref(false);
const waiting = ref(false);

onMounted(async () => {
  isMetamaskSupported.value = checkIfMetamaskIsInstalled();
  isLoggedIn.value = await checkIfLoggedIn();
  if (isLoggedIn.value) {
    connectWallet();
  }
  window.ethereum.on("accountsChanged", (accounts: string[]) => {
    if (accounts.length == 0) {
      isLoggedIn.value = false;
      ethereumConnector.setSigner(undefined);
    }
  });
});

async function connectWallet() {
  try {
    waiting.value = true;
    const signer = await connectMetamask();
    const signerAddress = await signer.getAddress();
    isLoggedIn.value = signerAddress != "";
    if (isLoggedIn.value) {
      ethereumConnector.setSigner(signer);
      address.value = signerAddress;
    }
  } finally {
    waiting.value = false;
  }
}

const computedAddress = computed(() => truncateString(address.value, 5));
</script>
<style></style>
