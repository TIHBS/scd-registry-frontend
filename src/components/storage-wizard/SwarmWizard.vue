import { FileInputEvent } from "@/util/FileInputEvent";

<template>
  <div class="swarm-wizard">
    <PostageBatchList class="bottom-space"></PostageBatchList>
    <label for="form-file">This is the Swarm wizard</label>
    <form @submit.prevent="onSubmit">
      <div class="input-group">
        <input
          type="file"
          @change="onFileChanged"
          class="form-control"
          id="form-file"
          ref="file"
        />
        <button
          @click="fetchBuildInfo"
          type="submit"
          class="btn input-group-prepend btn-outline-primary"
        >
          Upload
        </button>
      </div>
    </form>
    <button @click="upload" class="btn btn-outline-primary">Upload</button
    >{{ result }}
  </div>
</template>
<script setup lang="ts">
import { FileInputEvent } from "@/util/FileInputEvent";
import { UploadResult } from "@ethersphere/bee-js";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { swarmWizard } from "./SwarmWizard";
// @ts-ignore
import PostageBatchList from "../swarm/PostageBatchList.vue";

let file: File | null = null;
const result = ref<UploadResult>();

async function onFileChanged(event: FileInputEvent) {
  if (event.target.files.length != 0) {
    file = event.target.files[0];
  } else {
    file = null;
  }
  useToast().info(file ? file.name : "Nothing selected!");
}

async function upload() {
  result.value = await swarmWizard.upload(file!);
}
</script>

<style scoped>
.swarm-wizard {
  text-align: left;
}

.swarm-wizard label {
  font-weight: bold;
}

.bottom-space {
  margin-bottom: 10px;
}
</style>
