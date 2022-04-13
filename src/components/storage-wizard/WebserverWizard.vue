<template>
  <h2>This is the Webserver wizard</h2>
  <form @submit.prevent="onSubmit">
    <div class="container">
      <div class="row">
        <div class="col-11">
          <input
            id="url-input"
            v-model.lazy.trim="url"
            type="text"
            name="url"
            autocomplete="off"
            class="form-control"
          />
        </div>
        <div class="col-1">
          <button type="submit" class="btn btn-outline-primary">Fetch</button>
        </div>
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { webserverWizard } from "@/components/storage-wizard/WebserverWizard";

const emit = defineEmits<{
  (e: "fetchedSCD", scd: JSON | null): void;
}>();

const url = ref("");

async function onSubmit() {
  const result = await webserverWizard.fetchSCD(url.value);
  emit("fetchedSCD", result);
}
</script>
<style></style>
