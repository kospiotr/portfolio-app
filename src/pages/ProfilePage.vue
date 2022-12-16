<template>
  <q-page
    class="flex column"
    style="align-content: center; justify-content: space-around"
  >
    <p class="fit" style="display: flex; flex: 1">{{ auth.currentUser }}</p>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'stores/projects';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const store = useStore();

const auth = getAuth();

onMounted(() => {
  console.log({ store });
});
</script>
