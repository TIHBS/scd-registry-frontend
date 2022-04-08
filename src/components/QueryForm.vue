<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="container">
        <div class="row">
          <div class="col-11">
            <input
              id="query-input"
              v-model.lazy.trim="query"
              type="text"
              name="query"
              autocomplete="off"
              class="form-control"
            />
          </div>
          <div class="col-1">
            <button type="submit" class="btn btn-outline-primary">
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { ethereumConnector } from "@/ethereum/EthereumConnector";

const emit = defineEmits<{
  (e: "queryResults", results: unknown[]): void;
}>();

const query = ref("");
async function onSubmit() {
  const scds = await ethereumConnector.query(query.value);
  emit("queryResults", scds);
}
</script>

<style></style>
