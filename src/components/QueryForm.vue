<template>
  <div>
    <form @submit.prevent="onSubmit">
      <h2 class="label-wrapper">
        <label for="query-input"> Query </label>
      </h2>
      <div class="container">
        <div class="row">
          <div class="col-11">
            <input
              type="text"
              id="query-input"
              name="query"
              autocomplete="off"
              v-model.lazy.trim="query"
              class="form-control"
            />
          </div>
          <div class="col-1">
            <button type="submit" class="btn btn-outline-primary">Add</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";

const props = defineProps<{}>();

const query = ref("");
function onSubmit() {
  console.log(query.value);
}
</script>
