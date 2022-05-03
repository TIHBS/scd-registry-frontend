<template>
  <div class="card overflow">
    <div class="card-header">
      <b>Selected postage batch</b>
    </div>
    <div class="list-group-item">
      <PostageBatchComponent
        v-if="theBatch"
        :postageBatch="computedBatch"
      ></PostageBatchComponent>
      <span v-else>None</span>
    </div>
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
