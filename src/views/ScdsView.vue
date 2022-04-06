<template>
  <h1>This is the SCD list page</h1>
  <query-form></query-form>
  <ul class="scd-item-list list-group-flush container">
    <li
      v-for="item in items"
      :key="item.id"
      class="row list-group-item justify-content-between align-items-start"
    >
      <scd-item
        :id="item.id"
        :name="item.name"
        :author="item.author"
        :link="item.link"
        :signature="item.signature"
        :address="item.address"
      ></scd-item>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import uniqueId from "lodash.uniqueid";
import ScdItem from "@/components/ScdItem.vue";
import QueryForm from "@/components/QueryForm.vue";

const items = ref<{}[]>([]);
for (let i = 0; i < 5; i++) {
  items.value.push({
    id: uniqueId("item-"),
    name: "Learn Vue",
    author: "Bob",
    link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    signature: "0xdejsgöiut894ujijgpsog9u4jsiopejg904gopjspoejg",
    address: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
  });
}
</script>
<style>
.scd-item-list {
  margin-top: 10px;
}
</style>
