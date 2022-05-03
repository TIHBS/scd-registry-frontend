<template>
  <div class="card">
    <div class="card-header">
      <span>Status</span>
    </div>
    <div class="list-group-item">
      <span>Reference: </span>{{ uploadResult.reference }}
      <div v-if="uploadStatus">
        <span v-if="uploadStatus.finished" class="finished">
          Finished
          <i class="checkmark bi bi-check"></i>
        </span>
        <div v-else>
          <div><span>Processed: </span>{{ uploadStatus.processed }}%</div>
          <div><span>Synced: </span>{{ uploadStatus.synced }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { UploadStatus } from "@/util/Swarm";
import { UploadResult } from "@ethersphere/bee-js";
import { onMounted } from "@vue/runtime-core";
import { SCD } from "external/decentralised-scd-registry-common/src/interfaces/SCD";
import { ref } from "vue";
import { swarmWizard } from "../storage-wizard/SwarmWizard";

const emit = defineEmits<{
  (e: "finishedUpload", scd: SCD, url: string | null): void;
}>();

const props = defineProps<{ uploadResult: UploadResult }>();
const uploadStatus = ref<UploadStatus>();

onMounted(async () => {
  do {
    uploadStatus.value = await swarmWizard.getUploadStatus(
      props.uploadResult.tagUid
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } while (!uploadStatus.value.finished);

  const scd = await swarmWizard.fetchSCD(props.uploadResult.reference);

  emit("finishedUpload", scd, `swarm://${props.uploadResult.reference}`);
});
</script>
<style scoped>
span {
  font-weight: bold;
}
.finished {
  color: green;
}
.checkmark {
  font-size: 150%;
}
</style>
