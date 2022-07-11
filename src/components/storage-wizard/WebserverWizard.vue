<template>
  <div class="webserver-wizard">
    <label>This is the Webserver wizard</label>
    <form @submit.prevent="onSubmit">
      <div class="query-text-filed input-group">
        <input
          id="url-input"
          v-model.lazy.trim="url"
          type="text"
          name="url"
          autocomplete="off"
          class="form-control"
        />
        <button
          type="submit"
          class="btn btn-outline-primary input-group-prepend search-button"
        >
          Fetch
        </button>
      </div>
    </form>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { webserverWizard } from "@/components/storage-wizard/WebserverWizard";
import { SCD } from "external/scd-registry-common/src/interfaces/SCD";

const emit = defineEmits<{
  (e: "fetchedSCD", scd: SCD, url: string | null): void;
}>();

// default to make testing easier.
const url = ref("http://localhost:49160/scd1.json");

async function onSubmit() {
  const result = await webserverWizard.fetchSCD(url.value);
  emit("fetchedSCD", result, result ? url.value : null);
}
</script>
<style scoped>
.webserver-wizard {
  text-align: left;
}

.webserver-wizard label {
  font-weight: bold;
}
</style>
