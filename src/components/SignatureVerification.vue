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
import { ref } from "vue";

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

const result = ethereumConnector.verifySignature(
  props.message,
  props.signature
);

if (result === props.author) {
  state.value = State.VERIFIED;
} else {
  state.value = State.UNVERIFIED;
}
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
