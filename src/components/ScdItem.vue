<template>
  <div class="container scd-item">
    <div class="row">
      <div class="col-sm" style="text-align: left">
        <div>Name: {{ name }}</div>
        <div>Author: {{ author }}</div>
      </div>
      <div class="col-sm" style="text-align: right">
        <div>
          Location: <a v-bind:href="link">{{ link }}</a>
        </div>
        <div>Signature: {{ signature }}</div>
        <div>Address: {{ address }}</div>
      </div>
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
.scd-item {
  outline-style: solid;
  margin-top: 10px;
}
</style>
