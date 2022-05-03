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
      <SwarmWizard
        v-if="storageType == StorageType.Swarm"
        @fetchedSCD="onFetchedSCD"
      ></SwarmWizard>
      <br />
      <form @submit.prevent="onSubmit">
        <div v-if="fetched" class="container">
          <div class="row">
            <div class="col-sm border overflow-auto">
              <VueJsonPretty :path="'res'" :data="scdJson" />
            </div>
            <div class="col-sm">
              <button
                @click="signAndTransform"
                type="button"
                class="btn transform-button btn-outline-primary"
              >
                <i class="bi bi-arrow-right">Sign and transform</i></button
              ><br />
              <button type="submit" class="btn btn-outline-primary">
                Store
              </button>
            </div>
            <div class="col-sm border overflow-auto">
              <VueJsonPretty :path="'res'" :data="metadataJson" />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import { StorageType } from "@/util/StorageType";
import ipfs from "@/components/storage-wizard/IPFS.vue";
// @ts-ignore
import SwarmWizard from "@/components/storage-wizard/SwarmWizard.vue";
// @ts-ignore
import WebserverWizard from "@/components/storage-wizard/WebserverWizard.vue";
import { ref } from "vue";
// @ts-ignore
import VueJsonPretty from "vue-json-pretty";
import { ethereumConnector } from "@/ethereum/EthereumConnector";
import { SCD } from "../../external/decentralised-scd-registry-common/src/interfaces/SCD";
import { Registry } from "../../external/decentralised-scd-registry-common/src/wrappers/Registry";

const storageType = ref<StorageType>(StorageType.None);
const scdJson = ref<SCD | null>();
const metadataJson = ref<Registry.SCDMetadataStruct>();

const fetched = ref(false);

let currentUrl: string | null = null;

async function onFetchedSCD(scd: SCD | null, url: string | null) {
  scdJson.value = scd;
  metadataJson.value = undefined;
  currentUrl = url;
  fetched.value = scd != null;
}

async function signAndTransform() {
  if (fetched.value) {
    metadataJson.value = await ethereumConnector.scdToContractMetadata(
      scdJson.value!,
      currentUrl!
    );
  }
}

async function onSubmit() {
  if (!metadataJson.value) {
    throw new Error("You have sign and transform the SCD to store it.");
  }
  const transaction = await ethereumConnector.store(metadataJson.value!);
  const contractTransaction = await transaction.wait();
}
</script>
<style>
.transform-button {
  margin: 30px;
}
.dropdown-item {
  width: 100%;
}
</style>
