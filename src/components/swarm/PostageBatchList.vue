<template>
  <div class="postage-batch-list">
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="num-results col-sm left-column">
            <b>{{ computedNumberOfResults }}</b>
          </div>
          <div class="col-sm right-column">
            <button
              class="btn btn-outline-primary hide-show"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-batches"
              aria-expanded="false"
              aria-controls="collapse-batches"
            >
              show/hide
            </button>
          </div>
        </div>
      </div>
      <div class="collapse" id="collapse-batches">
        <ul class="list-group list-group-flush">
          <div v-if="postageBatches.length > 0">
            <PostageBatchItem
              v-for="item in postageBatches"
              @selectedPostageBatch="onSelectedPostageBatch"
              :clickable="true"
              :key="item.id"
              :postageBatch="item"
            ></PostageBatchItem>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PostageBatch } from "@ethersphere/bee-js";
import { onMounted } from "@vue/runtime-core";
import { computed, ref } from "vue";
import { swarmWizard } from "../storage-wizard/SwarmWizard";
// @ts-ignore
import PostageBatchItem from "./PostageBatch.vue";

const postageBatches = ref<PostageBatch[]>([]);

const computedNumberOfResults = computed(() => {
  if (postageBatches.value.length == 0) {
    return "No available Postage batches found";
  }
  if (postageBatches.value.length == 1) {
    return "1 available Postage batch found";
  }
  return `${postageBatches.value.length} available Postage batches found`;
});

onMounted(async () => {
  do {
    postageBatches.value = await swarmWizard.getAllPostageBatch();
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } while (true);
});

const emit = defineEmits<{
  (e: "selectedPostageBatch", results: PostageBatch): void;
}>();

function onSelectedPostageBatch(postageBatch: PostageBatch) {
  emit("selectedPostageBatch", postageBatch);
}
</script>
<style scoped>
.postage-batch-list .left-column {
  text-align: left;
}
.postage-batch-list .right-column {
  text-align: right;
}
.hide-show {
  font-size: 10px;
}
</style>
