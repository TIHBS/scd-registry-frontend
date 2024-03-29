<template>
  <div class="swarm-wizard">
    <label for="form-file ">This is the Swarm wizard 🐝</label>
    <UploadStatusComponent
      class="mb-2"
      v-if="uploadResult"
      @finishedUpload="onFinishedUpload"
      :uploadResult="uploadResult"
    ></UploadStatusComponent>
    <form id="form-file" @submit.prevent="onSubmit">
      <SelectedPostageBatch
        :batch="computedSelectedBatch"
        class="mb-2"
      ></SelectedPostageBatch>
      <CreatePostageBatch
        @createdPostageBatch="selected"
        class="mb-2"
      ></CreatePostageBatch>
      <PostageBatchList
        @selectedPostageBatch="selected"
        class="mb-2"
      ></PostageBatchList>
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
import { swarmWizard } from "./SwarmWizard";
import { SCD } from "external/scd-registry-common/src/interfaces/SCD";
// @ts-ignore
import PostageBatchList from "../swarm/PostageBatchList.vue";
// @ts-ignore
import CreatePostageBatch from "../swarm/CreatePostageBatch.vue";
// @ts-ignore
import SelectedPostageBatch from "../swarm/SelectedPostageBatch.vue";
// @ts-ignore
import UploadStatusComponent from "../swarm/UploadStatusComponent.vue";

const emit = defineEmits<{
  (e: "fetchedSCD", scd: SCD, url: string | null): void;
}>();

let file: File | null = null;
const selectedBatch = ref<PostageBatch>();
const computedSelectedBatch = computed(() => selectedBatch);
const uploadResult = ref<UploadResult>();

async function onFileChanged(event: FileInputEvent) {
  if (event.target.files.length != 0) {
    file = event.target.files[0];
  } else {
    file = null;
  }
}

async function onSubmit() {
  if (!selectedBatch.value) {
    throw new Error("You have to select a Postage batch!");
  }

  uploadResult.value = await swarmWizard.upload(
    file!,
    selectedBatch.value.batchID
  );
}

function selected(postageBatch: PostageBatch) {
  selectedBatch.value = postageBatch;
}

function onFinishedUpload(scd: SCD, url: string | null) {
  emit("fetchedSCD", scd, url);
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
