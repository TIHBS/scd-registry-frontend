<template>
  <div class="signature-verification container">
    <div
      v-if="state == State.VERIFIED"
      class="bi bi-check verification-indicator verified"
    >
      Signature matches
    </div>
    <div
      v-else-if="state == State.UNVERIFIED"
      class="bi bi-x verification-indicator unverified"
    >
      Signature doesn't match
    </div>
    <div v-else class="spinner-border" role="status"></div>
  </div>
</template>

<script setup lang="ts">
import { ethereumConnector } from "@/ethereum/EthereumConnector";
import { onMounted, ref } from "vue";

enum State {
  WAITING,
  VERIFIED,
  UNVERIFIED,
}

const props = defineProps<{
  message: string;
  signature: string;
  author: string;
}>();

const state = ref(State.WAITING);

onMounted(async () => {
  try {
    const result = ethereumConnector.verifySignature(
      props.message,
      props.author,
      props.signature
    );
    state.value = result ? State.VERIFIED : State.UNVERIFIED;
  } catch (err) {
    state.value = State.UNVERIFIED;
    throw err;
  }
});
</script>

<style scoped>
.verification-indicator {
  font-size: 150%;
}

.verified {
  color: green;
}

.unverified {
  color: red;
}
</style>
