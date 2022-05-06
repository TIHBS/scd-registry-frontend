<template>
  <div class="scd-item">
    <div class="row">
      <div class="col-5 left-column">
        <div><b>Id:</b> {{ metadata.id.toString() }}</div>
        <div><b>Name:</b> {{ metadata.metadata.name }}</div>
        <div>
          <b>Blockchain type:</b>
          {{ blockChainType }}
        </div>
        <div>
          <b>Author:</b> {{ truncateString(metadata.metadata.author, 50) }}
        </div>
      </div>
      <div class="col-6 right-column">
        <div>
          <b> Location: </b>
          <a :href="urlRef">{{ truncateString(metadata.metadata.url, 20) }}</a>
        </div>
        <div>
          <b>Signature:</b>
          {{ truncateString(metadata.metadata.signature, 20) }}
        </div>
        <div>
          <b>Address:</b>
          {{ truncateString(metadata.metadata.internalAddress, 20) }}
        </div>
      </div>
      <div class="col-1 right-column detail-link">
        <router-link :to="{ path: `/scds/${metadata.id}` }">
          <i class="bi bi-list-ul"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { truncateString } from "@/util/TruncateString";
import { extractReferenceFromUrl } from "@/util/Swarm";
import { Registry } from "external/decentralised-scd-registry-common/src/wrappers/Registry";
import { toBlockchainType } from "../../external/decentralised-scd-registry-common/src/interfaces/Types";

const props = defineProps<{
  metadata: Registry.SCDMetadataWithIDStructOutput;
}>();

const urlRef = ref("");
const blockChainType = ref(
  toBlockchainType.get(props.metadata.metadata.blockChainType)
);

onMounted(async () => {
  urlRef.value = await createCorrectUrl(props.metadata.metadata.url);
});

async function createCorrectUrl(url: string) {
  if (url.startsWith("swarm://")) {
    const reference = extractReferenceFromUrl(url);
    return new URL(
      `bzz/${reference}`,
      localStorage.getItem("swarm-api")!
    ).toString();
  }
  return url;
}
</script>
<style scoped>
.scd-item {
  overflow-wrap: break-word;
}
.left-column {
  text-align: left;
}
.right-column {
  text-align: right;
}
.detail-link {
  padding-top: 20px;
  padding-right: 20px;
}
.detail-link i {
  font-size: 250%;
  cursor: pointer;
}
</style>
