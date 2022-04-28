<template>
  <div class="settings">
    <form class="settings-form" @submit.prevent="onSubmit">
      <div class="settings-field">
        <label for="networkid">Network ID</label>
        <input
          id="networkid"
          v-model.lazy.trim="networkid"
          type="text"
          name="networkid"
          autocomplete="off"
          class="form-control"
        />
        <small id="emailHelp" class="form-text text-muted"
          >If you connect to Metamask this setting will be ignored.</small
        >
      </div>
      <div class="settings-field">
        <label for="contract-address">Contract address</label>
        <input
          id="contract-address"
          v-model.lazy.trim="contractAddress"
          type="text"
          name="contract-address"
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
      <button type="submit" class="btn btn-outline-primary">Save</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ethers } from "ethers";
import { computed, onMounted, ref } from "vue";
import { useToast } from "vue-toastification";

const networkid = ref("");
const contractAddress = ref("");
const correctNetworkid = computed(async () => {
  try {
    console.log(new URL(externalSearchProvider.value).toString());
    return true;
  } catch (error) {
    return false;
  }
});

const externalSearchProvider = ref("");
const correctExternalSearchProvider = computed(async () => {
  try {
    const provider = await ethers.getDefaultProvider(
      localStorage.getItem("networkid")!
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
  if (localStorage.getItem("networkid")) {
    networkid.value = localStorage.getItem("networkid")!;
  }

  if (localStorage.getItem("contract-address")) {
    contractAddress.value = localStorage.getItem("contract-address")!;
  }

  if (localStorage.getItem("externalSearchProvider")) {
    externalSearchProvider.value = localStorage.getItem(
      "externalSearchProvider"
    )!;
  }
});

async function onSubmit() {
  let noError = true;

  if (!correctNetworkid.value) {
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
    localStorage.setItem("networkid", networkid.value);
    localStorage.setItem("contract-address", contractAddress.value);
    localStorage.setItem(
      "externalSearchProvider",
      externalSearchProvider.value
    );
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
