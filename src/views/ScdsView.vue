<template>
  <h1>This is the SCD list page</h1>
  <h2><label for="query-input">Query: </label></h2>
  <input
    type="text"
    class="form-control"
    id="query-input"
    name="query"
    autocomplete="off"
  />
  <ul class="scd-item-list list-group-flush container">
    <li
      v-for="item in ToDoItems"
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
<style>
.scd-item-list {
  margin-top: 10px;
}
</style>
