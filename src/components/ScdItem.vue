<template>
  <div class="scd-item row">
    <div class="col-3 left-column">
      <div>Name: {{ name }}</div>
      <br />
      <div>Author: {{ author }}</div>
    </div>
    <div class="col-9 right-column">
      <div>
        Location: <a :href="url">{{ url }}</a>
      </div>
      <div>Signature: {{ signature }}</div>
      <div>Address: {{ address }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

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
