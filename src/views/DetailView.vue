<template>
  <div class="detail-view">
    <div class="card mb-2">
      <div class="card-header">
        <span
          ><b>ID: {{ theId }}</b></span
        >
      </div>
      <div class="list-group-item">
        <SignatureVerification
          v-if="state == State.FETCHED"
          :message="JSON.stringify(scd)"
          :signature="metadata.signature"
          :author="metadata.author"
        ></SignatureVerification>
        <PubKeyVerification
          v-if="state == State.FETCHED"
          :pubKeyMetadata="metadata.author"
          :pubkeyScd="scd.author_pub_key"
        ></PubKeyVerification>
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
// @ts-ignore
import PubKeyVerification from "@/components/PubKeyVerification.vue";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { ethereumConnector } from "@/ethereum/EthereumConnector";
import { webserverWizard } from "@/components/storage-wizard/WebserverWizard";
import { Registry } from "../../external/scd-registry-common/src/wrappers/Registry";
import VueJsonPretty from "vue-json-pretty";
import { SCD } from "../../external/scd-registry-common/src/interfaces/SCD";
import { swarmWizard } from "@/components/storage-wizard/SwarmWizard";
import { extractReferenceFromUrl } from "@/util/Swarm";

enum State {
  NOT_FETCHED,
  FETCHED,
}
const state = ref(State.NOT_FETCHED);

const router = useRouter();

const theId = computed(() => {
  const id = router.currentRoute.value.params.id as string;
  render(id);
  return id;
});

const scd = ref<SCD>();
const metadata = ref<Registry.SCDMetadataStruct>();

const scdComputed = computed(() => JSON.stringify(scd.value));
const signatureComputed = computed(() => metadata.value?.signature);
const authorComputed = computed(() => metadata.value?.author);

onMounted(async () => {
  render(theId.value);
});

async function render(id: string) {
  state.value = State.NOT_FETCHED;
  const retrieved = await ethereumConnector.retrieveById(id);
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
}
</script>
<style scoped>
.left-column {
  margin-right: 10px;
}
.right-column {
  margin-left: 10px;
}
</style>
