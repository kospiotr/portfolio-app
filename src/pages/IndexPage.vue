<template>
  <q-page class="row items-center justify-evenly">
    <p>{{ store.count }}</p>
    <q-btn label="test" @click="increase"></q-btn>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'stores/projects';

const store = useStore();

const increase = () => {
  console.log('Increase', store);
  store.count = store.count + 1;
};

onMounted(() => {
  console.log({ store });
});
</script>
