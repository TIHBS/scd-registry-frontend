<template>
  <div class="register">
    <WebserverWizard
      v-if="storageType == 'web'"
      @fetchedSCD="onFetchedSCD"
    ></WebserverWizard>
    <SwarmWizard
      v-if="storageType == 'swarm'"
      @fetchedSCD="onFetchedSCD"
    ></SwarmWizard>
    <br />
    <form @submit.prevent="onSubmit">
      <div v-if="fetched" class="card">
        <div class="card-header">
          <div class="row">
            <button
              @click="signAndTransform"
              type="button"
              class="col-sm btn btn-outline-primary m-1"
            >
              <i class="bi bi-arrow-right">Sign and transform</i>
            </button>
            <button type="submit" class="col-sm btn btn-outline-primary m-1">
              Store
            </button>
          </div>
        </div>
        <div class="list-group-item">
          <div class="row">
            <div class="col-sm border overflow-auto m-1">
              <VueJsonPretty :path="'res'" :data="scdJson" />
            </div>
            <div class="col-sm border overflow-auto m-1">
              <VueJsonPretty :path="'res'" :data="metadataJson" />
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import SwarmWizard from "@/components/storage-wizard/SwarmWizard.vue";
// @ts-ignore
import WebserverWizard from "@/components/storage-wizard/WebserverWizard.vue";
// @ts-ignore
import VueJsonPretty from "vue-json-pretty";
import { computed, ref } from "vue";
import { ethereumConnector } from "@/ethereum/EthereumConnector";
import { SCD } from "../../external/decentralised-scd-registry-common/src/interfaces/SCD";
import { Registry } from "../../external/decentralised-scd-registry-common/src/wrappers/Registry";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const storageType = computed(
  () => router.currentRoute.value.params.storageType as string
);

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
