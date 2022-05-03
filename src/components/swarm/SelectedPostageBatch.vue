<template>
  <div class="card overflow">
    <div class="card-header">
      <b>Selected postage batch</b>
    </div>
    <PostageBatchComponent
      v-if="theBatch"
      :postageBatch="computedBatch"
      :clickable="false"
      :selected="false"
    ></PostageBatchComponent>
    <span v-else class="list-group-item">None</span>
  </div>
</template>
<script setup lang="ts">
import { PostageBatch } from "@ethersphere/bee-js";
import { computed, ref } from "vue";

// @ts-ignore
import PostageBatchComponent from "./PostageBatch.vue";

const props = defineProps<{
  batch: PostageBatch | undefined;
}>();

const theBatch = ref(props.batch);
const computedBatch = computed(() => theBatch);
</script>
<style scoped></style>
