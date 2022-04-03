<template>
  <h1>This is the SCD list page</h1>
  <label for="query-input">Query: </label>
  <input type="text" id="query-input" name="query" autocomplete="off" />
  <li v-for="item in ToDoItems" :key="item.id">
    <scd-item
      :id="item.id"
      :name="item.name"
      :author="item.author"
      :link="item.link"
      :signature="item.signature"
      :address="item.address"
    ></scd-item>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScdItem from "@/components/ScdItem.vue";
import uniqueId from "lodash.uniqueid";

const item = {
  id: uniqueId("item-"),
  name: "Learn Vue",
  author: "Bob",
  link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  signature: "0xdejsgöiut894ujijgpsog9u4jsiopejg904gopjspoejg",
  address: "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
};

export default defineComponent({
  components: { ScdItem },
  data() {
    return {
      ToDoItems: [item, item, item, item, item],
    };
  },
});
</script>
<style></style>
