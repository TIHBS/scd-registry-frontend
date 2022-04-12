<template>
  <div class="storage">
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown button
      </button>
      <ul
        class="dropdown-menu dropdown-menu-dark"
        aria-labelledby="dropdownMenuButton1"
      >
        <li>
          <a class="dropdown-item" @click="storageType = StorageType.Webserver"
            >Webserver</a
          >
        </li>
        <li>
          <a class="dropdown-item" @click="storageType = StorageType.IPFS"
            >IPFS</a
          >
        </li>
        <li>
          <a class="dropdown-item" @click="storageType = StorageType.Swarm"
            >Swarm</a
          >
        </li>
      </ul>
    </div>
    <br />
    <div v-if="storageType != StorageType.None">
      <WebserverWizard
        v-if="storageType == StorageType.Webserver"
        @fetchedSCD="onFetchedSCD"
      ></WebserverWizard>
      <ipfs v-if="storageType == StorageType.IPFS"></ipfs>
      <swarm v-if="storageType == StorageType.Swarm"></swarm>
      <br />
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <VueJsonPretty :path="'res'" :data="scdJson"> </VueJsonPretty>
          </div>
          <div class="col-sm"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { StorageType } from "@/util/StorageType";
import ipfs from "@/components/StorageWizard/IPFS.vue";
import Swarm from "@/components/StorageWizard/Swarm.vue";
// @ts-ignore
import WebserverWizard from "@/components/StorageWizard/WebserverWizard.vue";
import { ref } from "vue";
// @ts-ignore
import VueJsonPretty from "vue-json-pretty";

const storageType = ref<StorageType>(StorageType.None);
const scdJson = ref<JSON>();

function onFetchedSCD(scd: JSON) {
  scdJson.value = scd;
}
</script>
<style>
.dropdown-item {
  width: 100%;
}
</style>
