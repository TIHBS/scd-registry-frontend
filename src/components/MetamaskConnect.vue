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
      @click="displayAddress"
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
    displayAddress();
  }
  window.ethereum.on("accountsChanged", (accounts: string[]) => {
    isLoggedIn.value = accounts.length != 0;
    if (!isLoggedIn.value) {
      ethereumConnector.setSigner(undefined);
    }
  });
});

async function displayAddress() {
  try {
    waiting.value = true;
    const signerAddress = await (
      await ethereumConnector.getSigner()
    ).getAddress();

    isLoggedIn.value = signerAddress != "";
    if (isLoggedIn.value) {
      address.value = signerAddress;
    }
  } finally {
    waiting.value = false;
  }
}

const computedAddress = computed(() => truncateString(address.value, 5));
</script>
<style></style>
