<template>
  <div class="detail-view">
    <div class="card mb-2">
      <div class="card-header">
        <span
          ><b>ID: {{ id }}</b></span
        >
      </div>
      <div class="list-group-item">
        <SignatureVerification
          v-if="state == State.FETCHED"
          SignatureVerification
          :message="scdComputed"
          :signature="metadata.signature"
          :author="authorComputed"
        ></SignatureVerification>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-sm border overflow-auto right-column">
          <VueJsonPretty :path="'res'" :data="scd" />
        </div>
        <div class="col-sm border overflow-auto left-column">
          <VueJsonPretty :path="'res'" :data="metadata" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import SignatureVerification from "@/components/SignatureVerification.vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ethereumConnector } from "@/ethereum/EthereumConnector";
import { webserverWizard } from "@/components/storage-wizard/WebserverWizard";
import { Registry } from "../../external/decentralised-scd-registry-common/src/wrappers/Registry";
import VueJsonPretty from "vue-json-pretty";
import { SCD } from "../../external/decentralised-scd-registry-common/src/interfaces/SCD";
import { swarmWizard } from "@/components/storage-wizard/SwarmWizard";
import { Reference, REFERENCE_HEX_LENGTH } from "@ethersphere/bee-js";
import { extractReferenceFromUrl } from "@/util/Swarm";

enum State {
  NOT_FETCHED,
  FETCHED,
}
const state = ref(State.NOT_FETCHED);

const router = useRouter();
let id = router.currentRoute.value.params.id;

let theId = "";
if (id instanceof String) {
  theId = id as string;
} else {
  theId = id[0];
}

const scd = ref<SCD>();
const metadata = ref<Registry.SCDMetadataStruct>();

const scdComputed = computed(() => JSON.stringify(scd.value));
const signatureComputed = computed(() => metadata.value?.signature);
const authorComputed = computed(() => metadata.value?.author);

onMounted(async () => {
  const retrieved = await ethereumConnector.retrieveById(theId);
  if (!retrieved.metadata.isValid) {
    throw new Error("No SCD with this id exists!");
  }

  metadata.value = {
    name: retrieved.metadata.name,
    author: retrieved.metadata.author,
    internalAddress: retrieved.metadata.internalAddress,
    url: retrieved.metadata.url,
    signature: retrieved.metadata.signature,
    version: retrieved.metadata.version,
    functions: retrieved.metadata.functions,
    events: retrieved.metadata.events,
    isValid: retrieved.metadata.isValid,
    blockChainType: retrieved.metadata.blockChainType,
  };

  if (metadata.value.url.startsWith("swarm://")) {
    const reference = extractReferenceFromUrl(metadata.value.url);
    scd.value = (await swarmWizard.fetchSCD(reference)) as SCD;
  } else {
    scd.value = (await webserverWizard.fetchSCD(metadata.value.url)) as SCD;
  }
  state.value = State.FETCHED;
});
</script>
<style scoped>
.left-column {
  margin-right: 10px;
}
.right-column {
  margin-left: 10px;
}
</style>
