<template>
  <div v-if="isMetamaskSupported">
    <button
      class="btn btn-outline-success my-2 my-sm-0"
      @click="connectWallet"
      type="button"
    >
      Connect Metamask
    </button>
  </div>
  <div v-else-if="isLoggedIn">{{ address }}</div>
  <div v-else><span class="navbar-text">Install Metamask</span></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { Signer } from "ethers";
import {
  checkIfMetamaskIsInstalled,
  connectWallet,
  isLoggedIn,
} from "@/Metamask/Metamask";
export default defineComponent({
  methods: {
    async connectWallet() {
      this.signer = await connectWallet(window);
      this.isLoggedIn = true;
      this.address = await this.signer.getAddress();
    },
  },
  data() {
    return {
      isMetamaskSupported: false,
      isLoggedIn: false,
      signer: undefined as unknown as Signer,
      address: "",
    };
  },
  components: {},
  async mounted() {
    this.isMetamaskSupported = checkIfMetamaskIsInstalled(window);
    this.isLoggedIn = await isLoggedIn(this.signer);
    this.address = await this.signer?.getAddress();
    console.log(this.address);
  },
});
</script>
<style></style>
