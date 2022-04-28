<template>
  <div class="scd-item">
    <div class="row">
      <div class="col-5 left-column">
        <div><b>Id:</b> {{ scdId }}</div>
        <div><b>Name:</b> {{ name }}</div>
        <div><b>Author:</b> {{ truncateString(author, 50) }}</div>
      </div>
      <div class="col-6 right-column">
        <div>
          <b> Location:</b> <a :href="url">{{ url }}</a>
        </div>
        <div><b>Signature:</b> {{ truncateString(signature, 20) }}</div>
        <div><b>Address:</b> {{ truncateString(address, 20) }}</div>
      </div>
      <div class="col-1 right-column detail-link">
        <router-link :to="{ path: `/scds/${navId}` }">
          <i class="bi bi-list-ul"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import { truncateString } from "@/util/TruncateString";

const props = defineProps<{
  id: string;
  scdId: Number;
  name: string;
  author: string;
  url: string;
  signature: string;
  address: string;
}>();

const navId = props.scdId.toString();
</script>
<style scoped>
.scd-item {
  overflow-wrap: break-word;
}
.left-column {
  text-align: left;
}
.right-column {
  text-align: right;
}
.detail-link {
  padding-top: 10px;
}
.detail-link i {
  font-size: 250%;
  cursor: pointer;
}
</style>
