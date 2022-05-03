<template>
  <div class="create-postage-batch">
    <form @submit.prevent="onSubmit">
      <div class="card">
        <div class="card-header">
          <span> Create postage batch</span>
        </div>
        <div class="list-group-item">
          <div class="row mb-2">
            <div class="col-sm">
              <span>Amount:</span>
              <input
                id="amount-input"
                v-model.lazy.trim="amount"
                type="text"
                name="query"
                autocomplete="off"
                class="form-control"
              />
            </div>
            <div class="col-sm">
              <span>Depth:</span>
              <input
                id="depth-input"
                v-model.lazy.trim="depth"
                type="text"
                name="query"
                autocomplete="off"
                class="form-control"
              />
            </div>
          </div>
          <button
            v-if="waiting == false"
            type="submit"
            class="btn input-group-prepend btn-outline-primary"
          >
            Create
          </button>
          <div v-else>
            <i class="spinner-border spinner" role="status"></i>Creating...
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { PostageBatch } from "@ethersphere/bee-js";
import { ref } from "vue";
import { swarmWizard } from "../storage-wizard/SwarmWizard";

const emit = defineEmits<{
  (e: "createdPostageBatch", results: PostageBatch): void;
}>();

const amount = ref("1000000");
const depth = ref(20);
const waiting = ref(false);

async function onSubmit() {
  try {
    waiting.value = true;
    const batchId = await swarmWizard.createPostageBatch(
      amount.value,
      depth.value
    );
    const batch = await swarmWizard.getPostageBatch(batchId);
    emit("createdPostageBatch", batch);
  } finally {
    waiting.value = false;
  }
}
</script>
<style scoped>
.spinner {
  scale: 70%;
}
.create-postage-batch span {
  font-weight: bold;
}
</style>
