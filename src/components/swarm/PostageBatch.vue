<template>
  <div
    class="postage-batch list-group-item"
    @click="clickable ? onClick() : () => {}"
    :class="{ clickable: clickable }"
  >
    <div class="row">
      <div class="col-sm left-column">
        <div><b>Batch ID:</b> {{ thePostageBatch.batchID }}</div>
        <div><b>Label:</b> {{ thePostageBatch.label }}</div>
        <div><b>Usable:</b> {{ thePostageBatch.usable }}</div>
      </div>
      <div class="col-sm right-column">
        <div><b>TTL:</b> {{ thePostageBatch.batchTTL }}</div>
        <div><b>Amount:</b> {{ thePostageBatch.amount }}</div>
        <div><b>Depth:</b> {{ thePostageBatch.depth }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PostageBatch } from "@ethersphere/bee-js";
import { onMounted, ref } from "vue";
import { swarmWizard } from "../storage-wizard/SwarmWizard";

const props = defineProps<{
  postageBatch: PostageBatch;
  clickable: boolean;
}>();

const emit = defineEmits<{
  (e: "selectedPostageBatch", results: PostageBatch): void;
}>();

const thePostageBatch = ref(props.postageBatch);
onMounted(async () => {
  while (!thePostageBatch.value.usable) {
    thePostageBatch.value = await swarmWizard.getPostageBatch(
      thePostageBatch.value.batchID
    );
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
});

function onClick() {
  emit("selectedPostageBatch", thePostageBatch.value);
}
</script>
<style scoped>
.postage-batch {
  overflow-wrap: break-word;
}
.postage-batch .left-column {
  text-align: left;
}
.postage-batch .right-column {
  text-align: right;
}
.clickable {
  cursor: pointer;
}
</style>
