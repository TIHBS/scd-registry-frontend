<template>
  <query-form @query-results="onQueryResults"></query-form><br />

  <div class="card">
    <div class="card-header">
      <div class="num-results">
        <b>{{ computedNumberOfResults }}</b>
      </div>
    </div>
    <ul class="list-group list-group-flush">
      <div v-if="items.length > 0">
        <li
          v-for="item in items"
          :key="item.id"
          class="list-group-item justify-content-between align-items-start"
        >
          <scd-item :metadata="item"></scd-item>
        </li>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import uniqueId from "lodash.uniqueid";
// @ts-ignore
import ScdItem from "@/components/ScdItem.vue";
// @ts-ignore
import QueryForm from "@/components/QueryForm.vue";
import { Registry } from "../../external/decentralised-scd-registry-common/src/wrappers/Registry";

const items = ref<Registry.SCDMetadataWithIDStructOutput[]>([]);

const computedNumberOfResults = computed(() => {
  if (items.value.length == 0) {
    return "No results found";
  }
  return `${items.value.length} results`;
});

function onQueryResults(results: Registry.SCDMetadataWithIDStructOutput[]) {
  items.value = results;
}
</script>
<style>
.num-results {
  text-align: left;
}
</style>
