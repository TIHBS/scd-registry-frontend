<template>
  <div class="postage-batch">
    <div class="row">
      <div class="col-sm left-column">
        <div><b>Batch ID:</b> {{ postageBatch.batchID }}</div>
        <div><b>Label:</b> {{ postageBatch.label }}</div>
        <div><b>Usable:</b> {{ postageBatch.usable }}</div>
      </div>
      <div class="col-sm right-column">
        <div><b>TTL:</b> {{ postageBatch.batchTTL }}</div>
        <div><b>Amount:</b> {{ postageBatch.amount }}</div>
        <div><b>Depth:</b> {{ postageBatch.depth }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PostageBatch } from "@ethersphere/bee-js";

const props = defineProps<{
  postageBatch: PostageBatch;
}>();
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
</style>
