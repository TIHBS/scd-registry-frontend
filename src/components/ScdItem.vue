<template>
  <div class="scd-item row">
    <div class="col-5 left-column">
      <div>Id: {{ scdId }}</div>
      <div>Name: {{ name }}</div>
      <div>Author: {{ truncateString(author, 50) }}</div>
    </div>
    <div class="col-6 right-column">
      <div>
        Location: <a :href="url">{{ url }}</a>
      </div>
      <div>Signature: {{ truncateString(signature, 60) }}</div>
      <div>Address: {{ truncateString(address, 60) }}</div>
    </div>
    <div class="col-1 right-column">
      <br />
      <router-link :to="{ path: `/scds/${navId}` }">
        <i class="detail-link bi bi-list-ul"></i>
      </router-link>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import { truncateString } from "@/util/TruncateString";
import { useRouter } from "vue-router";

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
  font-size: 325%;
  cursor: pointer;
}
</style>
