<template>
  <div class="ipfs-wizard">
    <label for="form-file ">This is the IPFS wizard</label>
    <form id="form-file" @submit.prevent="onSubmit">
      <div class="input-group mb-2">
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
          Stage
        </button>
      </div>
    </form>
    {{ cid }}
  </div>
</template>
<script setup lang="ts">
import { FileInputEvent } from "@/util/FileInputEvent";
import { ref } from "vue";
import { ipfsWizard } from "./IPFSWizard";

let file: File | null = null;
const cid = ref("");
async function onSubmit() {
  if (!file) {
    throw new Error("You have to select a file first!");
  }
  cid.value = await ipfsWizard.stage(file);
}

async function onFileChanged(event: FileInputEvent) {
  if (event.target.files.length != 0) {
    file = event.target.files[0];
  } else {
    file = null;
  }
}
</script>
<style scoped>
.ipfs-wizard {
  text-align: left;
}
.ipfs-wizard label {
  font-weight: bold;
}
</style>
