<template>
  <div class="settings">
    <form class="settings-form" @submit.prevent="onSubmit">
      <div class="settings-field">
        <label for="networkish">Networkish</label>
        <input
          id="networkish"
          v-model.lazy.trim="networkish"
          type="text"
          name="networkish"
          autocomplete="off"
          class="form-control"
        />
        <small id="emailHelp" class="form-text text-muted"
          >Enter the URL to a blockchain node or the network id. If you connect
          to Metamask this setting will be ignored.</small
        >
      </div>
      <div class="settings-field">
        <label for="contractAddress">Contract address</label>
        <input
          id="contractAddress"
          v-model.lazy.trim="contractAddress"
          type="text"
          name="contractAddress"
          autocomplete="off"
          class="form-control"
        />
      </div>
      <div class="settings-field">
        <label for="external-search-provider">External search provider</label>
        <input
          id="external-search-provider"
          v-model.lazy.trim="externalSearchProvider"
          type="text"
          name="external-search-provider"
          autocomplete="off"
          class="form-control"
        />
      </div>
      <div class="settings-field">
        <label for="swarmDebug">Swarm debug</label>
        <input
          id="swarmDebug"
          v-model.lazy.trim="swarmDebug"
          type="text"
          name="swarmDebug"
          autocomplete="off"
          class="form-control"
        />
      </div>
      <div class="settings-field">
        <label for="swarmApi">Swarm api</label>
        <input
          id="swarmApi"
          v-model.lazy.trim="swarmApi"
          type="text"
          name="swarmApi"
          autocomplete="off"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-outline-primary">Save</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const networkish = ref("");
const contractAddress = ref("");
const swarmDebug = ref("");
const swarmApi = ref("");

const correctNetworkish = computed(async () => {
  try {
    return true;
  } catch (error) {
    return false;
  }
});

const externalSearchProvider = ref("");
const correctExternalSearchProvider = computed(async () => {
  try {
    const provider = await ethers.getDefaultProvider(
      localStorage.getItem("networkish")!
    );
    if (provider) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
});

onMounted(() => {
  if (localStorage.getItem("networkish")) {
    networkish.value = localStorage.getItem("networkish")!;
  }

  if (localStorage.getItem("contractAddress")) {
    contractAddress.value = localStorage.getItem("contractAddress")!;
  }

  if (localStorage.getItem("externalSearchProvider")) {
    externalSearchProvider.value = localStorage.getItem(
      "externalSearchProvider"
    )!;
  }

  if (localStorage.getItem("swarmDebug")) {
    swarmDebug.value = localStorage.getItem("swarmDebug")!;
  }

  if (localStorage.getItem("swarmApi")) {
    swarmApi.value = localStorage.getItem("swarmApi")!;
  }
});

async function onSubmit() {
  let noError = true;

  if (!correctNetworkish.value) {
    useToast().error("You haven't entered a valid network ID");
    noError = false;
  }
  if (!correctExternalSearchProvider.value) {
    useToast().error(
      "You entered an invalid URL for the External search provider!"
    );
    noError = false;
  }

  if (noError) {
    localStorage.setItem("networkish", networkish.value);
    localStorage.setItem("contractAddress", contractAddress.value);
    localStorage.setItem(
      "externalSearchProvider",
      externalSearchProvider.value
    );
    localStorage.setItem("swarmDebug", swarmDebug.value);
    localStorage.setItem("swarmApi", swarmApi.value);

    useToast().success("Saved settings");
  }
}
</script>
<style scoped>
.settings-form {
  text-align: left;
}

.settings-form label {
  font-weight: bold;
}

.settings-form .settings-field {
  margin-bottom: 10px;
}
</style>
