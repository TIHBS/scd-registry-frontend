<template>
  <div class="register">
    <h1>This is the register page</h1>
    <button @click="storeInIPFS" type="button" class="btn btn-outline-primary">
      Store</button
    ><button
      @click="fetchFromIPFS"
      type="button"
      class="btn btn-outline-primary"
    >
      Fetch
    </button>
    <br />
    <br />
    <span>{{ displayedCid }}</span>
    <br />
    <span>{{ displayedFile }}</span>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { ipfsConnector } from "@/ipfs/IPFS";

const displayedCid = ref("");
const displayedFile = ref("");
let cid = "";

async function storeInIPFS() {
  cid = await ipfsConnector.store("blaaaaaaaaaaa");
  displayedCid.value = cid;
}

async function fetchFromIPFS() {
  displayedFile.value = await ipfsConnector.fetchData(cid);
}
</script>
<style></style>
