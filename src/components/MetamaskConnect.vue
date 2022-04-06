<template>
  <div v-if="!isLoggedIn">
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
  <span v-else class="navbar-text">{{ computedAddress }}</span>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { Signer } from "ethers";
import {
  checkIfMetamaskIsInstalled,
  connectMetamask,
  truncateAddress,
} from "@/metamask/Metamask";

const isMetamaskSupported = ref(false);
const signer = ref<Signer>();
const address = ref("");
const isLoggedIn = ref(false);

onMounted(
  () => (isMetamaskSupported.value = checkIfMetamaskIsInstalled(window))
);

async function connectWallet() {
  [signer.value, address.value] = await connectMetamask(window);
  isLoggedIn.value = true;
}
const computedAddress = computed(() => truncateAddress(address.value));
</script>
<style></style>
