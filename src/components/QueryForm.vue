<template>
  <div class="query-form">
    <form @submit.prevent="onSubmit">
      <div class="query-text-filed input-group">
        <input
          id="query-input"
          v-model.lazy.trim="query"
          type="text"
          name="query"
          autocomplete="off"
          class="form-control"
        />
        <button
          type="submit"
          class="btn input-group-prepend btn-outline-primary search-button"
        >
          <i class="bi bi-search"></i>
        </button>
      </div>
      <div class="search-mode">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="trustworthySearch"
            id="trustworthySearch"
            value="TRUSTWORTHY"
            v-model="pickedSearchMode"
          />
          <label class="form-check-label" for="trustworthySearch">
            Trustworthy search
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="easySearch"
            id="easySearch"
            value="EASY"
            v-model="pickedSearchMode"
          />
          <label class="form-check-label" for="easySearch"> Easy search </label>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, onMounted, watch } from "vue";
import { queryService } from "@/components/QueryService";
import { Registry } from "external/decentralised-scd-registry-common/src/Conversion";

const emit = defineEmits<{
  (e: "queryResults", results: Registry.SCDMetadataWithIDStructOutput[]): void;
}>();

const query = ref("");
const pickedSearchMode = ref(getSearchMode());

watch(pickedSearchMode, (pickedSearchMode) => {
  localStorage.setItem("pickedSearchMode", pickedSearchMode);
});

onMounted(() => {
  if (localStorage.getItem("pickedSearchMode")) {
    pickedSearchMode.value = localStorage.getItem("pickedSearchMode")!;
  }
});

function getSearchMode(): string {
  if (localStorage.getItem("pickedSearchMode")) {
    return localStorage.getItem("pickedSearchMode")!;
  }
  throw new Error("No search mode was specified!");
}

async function onSubmit() {
  const scds = await queryService.query(query.value);
  emit("queryResults", scds);
}
</script>

<style scoped>
.query-form .query-text-filed {
  margin-bottom: 10px;
}

.query-form .search-button {
  font-size: 80%;
}

.search-mode {
  text-align: left;
}
</style>
