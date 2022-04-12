<template>
  <form @submit.prevent="onSubmit">
    <div class="form-group row">
      <label for="form-file">Select a smart contract</label>
      <div class="col-11">
        <input
          type="file"
          @change="onFileChanged"
          class="form-control"
          id="form-file"
          ref="file"
        />
      </div>
      <div class="col-1">
        <button
          @click="fetchBuildInfo"
          type="submit"
          class="btn btn-outline-primary button-margin"
        >
          Upload
        </button>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import { FileInputEvent } from "@/util/FileInputEvent";
import { powergateConnector } from "@/powergate/PowergateConnector";

let file: File | null = null;

async function onFileChanged(event: FileInputEvent) {
  if (event.target.files.length != 0) {
    file = event.target.files[0];
  } else {
    file = null;
  }
}

async function onSubmit() {
  if (file != null) {
    powergateConnector.upload(file);
  }
}
</script>
<style></style>
