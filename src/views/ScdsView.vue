<template>
  <h1>This is the SCD list page</h1>
  <query-form @query-results="onQueryResults"></query-form><br />
  <h2>{{ computedNumberOfResults }}</h2>
  <ul class="scd-item-list list-group-flush container">
    <div v-if="items.length > 0">
      <li
        v-for="item in items"
        :key="item.id"
        class="row list-group-item justify-content-between align-items-start"
      >
        <scd-item
          :id="uniqueId('item-')"
          :scdId="item.id"
          :name="item.metadata.name"
          :author="item.metadata.author"
          :url="item.metadata.url"
          :signature="item.metadata.signature"
          :address="item.metadata.internalAddress"
        ></scd-item>
      </li>
    </div>
    <span v-else>No results found </span>
  </ul>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import uniqueId from "lodash.uniqueid";
// @ts-ignore
import ScdItem from "@/components/ScdItem.vue";
// @ts-ignore
import QueryForm from "@/components/QueryForm.vue";
import { Registry } from "external/decentralised-scd-registry/src/types/Registry";

const items = ref<Registry.SCDMetadataWithIDStructOutput[]>([]);

const computedNumberOfResults = computed(
  () => `${items.value.length} SCDs found`
);

function onQueryResults(results: Registry.SCDMetadataWithIDStructOutput[]) {
  items.value = results;
}
</script>
<style>
.scd-item-list {
  margin-top: 10px;
}
</style>
