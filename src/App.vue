<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const isLoggedIn = ref(false);
let auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = user ? true : false;
    console.log('user', user);
  });
});
</script>
