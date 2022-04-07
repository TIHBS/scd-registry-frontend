<template>
  <div class="scd-item row">
    <div class="col-3 left-column">
      <div>Name: {{ name }}</div>
      <br />
      <div>Author: {{ author }}</div>
    </div>
    <div class="col-9 right-column">
      <div>
        Location: <a v-bind:href="url">{{ url }}</a>
      </div>
      <div>Signature: {{ signature }}</div>
      <div>Address: {{ address }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  id: String;
  name: String;
  author: String;
  url: String;
  signature: String;
  address: String;
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
