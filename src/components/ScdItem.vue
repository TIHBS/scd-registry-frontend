<template>
  <div class="scd-item row" @click="routeToDetails">
    <div class="col-5 left-column">
      <div>Id: {{ scdId }}</div>
      <div>Name: {{ name }}</div>
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
const router = useRouter();
function routeToDetails() {
  router.push({ path: `/scds/${navId}` });
}
</script>
<style scoped>
.scd-item {
  overflow-wrap: break-word;
  cursor: pointer;
}
.left-column {
  text-align: left;
}
.right-column {
  text-align: right;
}
</style>
