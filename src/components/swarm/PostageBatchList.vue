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
            <li
              v-for="item in postageBatches"
              :key="item.id"
              class="list-group-item justify-content-between align-items-start"
            >
              <postage-batch-item :postageBatch="item"></postage-batch-item>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAllPostageBatch } from "@/util/Swarm";
import { BeeDebug, PostageBatch } from "@ethersphere/bee-js";
import { onMounted } from "@vue/runtime-core";
import { computed, ref } from "vue";
import PostageBatchItem from "./PostageBatch.vue";
import uniqueId from "lodash.uniqueid";

const postageBatches = ref<PostageBatch[]>([]);

const computedNumberOfResults = computed(() => {
  if (postageBatches.value.length == 0) {
    return "No Postage batches found";
  }
  return `${postageBatches.value.length} batches`;
});

onMounted(async () => {
  const beeDebug = new BeeDebug(localStorage.getItem("swarm-debug")!);
  postageBatches.value = await getAllPostageBatch(beeDebug);
});
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
