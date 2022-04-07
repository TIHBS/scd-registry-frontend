<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="container">
        <div class="row">
          <div class="col-11">
            <input
              type="text"
              id="query-input"
              name="query"
              autocomplete="off"
              v-model.lazy.trim="query"
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
import { ref } from "@vue/reactivity";
import { ethereumConnector } from "@/ethereum/EthereumConnector";

const emit = defineEmits<{ (e: "queryResults", results: {}[]): void }>();

const query = ref("");
async function onSubmit() {
  const scds = await ethereumConnector.query(query.value);
  emit("queryResults", scds);
}
</script>

<style></style>
