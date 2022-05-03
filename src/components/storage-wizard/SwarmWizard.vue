<template>
  <div class="swarm-wizard">
    <label for="form-file ">This is the Swarm wizard</label>
    <form id="form-file" @submit.prevent="onSubmit">
      <SelectedPostageBatch
        :batch="computedSelectedBatch"
        class="mb-2"
      ></SelectedPostageBatch>
      <CreatePostageBatch
        @createdPostageBatch="selected"
        class="mb-2"
      ></CreatePostageBatch>
      <PostageBatchList class="mb-2"></PostageBatchList>
      <div class="input-group">
        <input
          type="file"
          @change="onFileChanged"
          class="form-control"
          ref="file"
        />
        <button
          type="submit"
          class="btn input-group-prepend btn-outline-primary"
        >
          Upload
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { FileInputEvent } from "@/util/FileInputEvent";
import { PostageBatch, UploadResult } from "@ethersphere/bee-js";
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { swarmWizard } from "./SwarmWizard";
// @ts-ignore
import PostageBatchList from "../swarm/PostageBatchList.vue";
// @ts-ignore
import CreatePostageBatch from "../swarm/CreatePostageBatch.vue";
// @ts-ignore
import SelectedPostageBatch from "../swarm/SelectedPostageBatch.vue";

let file: File | null = null;
const result = ref<UploadResult>();
const selectedBatch = ref<PostageBatch>();
const computedSelectedBatch = computed(() => selectedBatch);

async function onFileChanged(event: FileInputEvent) {
  if (event.target.files.length != 0) {
    file = event.target.files[0];
  } else {
    file = null;
  }
  useToast().info(file ? file.name : "Nothing selected!");
}

async function onSubmit() {
  console.log(3243243242);
  result.value = await swarmWizard.upload(file!);
}

function selected(postageBatch: PostageBatch) {
  console.log(postageBatch.batchID);
  selectedBatch.value = postageBatch;
}
</script>

<style scoped>
.swarm-wizard {
  text-align: left;
}

.swarm-wizard label {
  font-weight: bold;
}
</style>
