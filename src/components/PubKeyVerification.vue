<template>
  <div class="pub-key-verification container">
    <div
      v-if="state == State.EQUAL"
      class="bi bi-check verification-indicator equal"
    >
      Public keys are equal
    </div>
    <div
      v-else-if="state == State.UNEQUAL"
      class="bi bi-x verification-indicator unequal"
    >
      Public keys are unequal
    </div>
    <div v-else class="spinner-border" role="status"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

enum State {
  WAITING,
  EQUAL,
  UNEQUAL,
}

const props = defineProps<{
  pubKeyMetadata: string;
  pubkeyScd: string;
}>();

const state = ref(State.WAITING);

function verifyPubKey(pubKeyMetadata: string, pubkeyScd: string): boolean {
  return pubKeyMetadata == pubkeyScd;
}

onMounted(() => {
  try {
    console.log(props.pubKeyMetadata);
    console.log(props.pubkeyScd);
    const result = verifyPubKey(props.pubKeyMetadata, props.pubkeyScd);
    state.value = result ? State.EQUAL : State.UNEQUAL;
  } catch (err) {
    state.value = State.UNEQUAL;
    throw err;
  }
});
</script>

<style scoped>
.verification-indicator {
  font-size: 150%;
}

.equal {
  color: green;
}

.unequal {
  color: red;
}
</style>
