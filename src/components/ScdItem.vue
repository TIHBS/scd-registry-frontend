<template>
  <div class="scd-item row">
    <div class="col-sm left-column">
      <div>Name: {{ name }}</div>
      <br />
      <div>Author: {{ author }}</div>
    </div>
    <div class="col-sm right-column">
      <div>
        Location: <a v-bind:href="link">{{ link }}</a>
      </div>
      <div>Signature: {{ signature }}</div>
      <div>Address: {{ address }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: String!,
    name: String!,
    author: String!,
    link: String!,
    signature: String!,
    address: String!,
  },
});
</script>
<style>
.left-column {
  text-align: left;
}
.right-column {
  text-align: right;
}
</style>
