<template>
  <q-page
    class="flex column"
    style="align-content: center; justify-content: space-around"
  >
    <q-btn label="asdfasfd" @click="doImport()"></q-btn>
  </q-page>
</template>

<script lang="ts" setup>
import { useStore } from 'stores/projects';
import { collection, addDoc } from 'firebase/firestore';
import { api } from 'boot/axios';
import { db } from 'boot/firebase';

const store = useStore();
const doImport = () => {
  //
  api.get('projects.json').then(async function (response) {
    console.log('got data', response.data);
    try {
      response.data.forEach(async (data) => {
        const docRef = await addDoc(collection(db, 'project_old'), data);
        console.log('Document written with ID: ', docRef.id);
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  });
};
</script>
