<template>
  <div class="scd-item row">
    <div class="col-5 left-column">
      <div>Name: {{ name }}</div>
      <br />
      <div>Author: {{ truncateString(author, 50) }}</div>
    </div>
    <div class="col-7 right-column">
      <div>
        Location: <a :href="url">{{ url }}</a>
      </div>
      <div>Signature: {{ truncateString(signature, 60) }}</div>
      <div>Address: {{ truncateString(address, 60) }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
import { truncateString } from "@/util/TruncateString";

defineProps<{
  id: string;
  name: string;
  author: string;
  url: string;
  signature: string;
  address: string;
}>();
</script>
<style>
.left-column {
  text-align: left;
}
.right-column {
  text-align: right;
}
</style>
