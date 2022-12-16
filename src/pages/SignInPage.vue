<template>
  <q-layout view="lHh Lpr fff">
    <q-page-container class="bg-grey-2">
      <q-page
        class="bg-light-blue-7 window-height window-width row justify-center items-center"
      >
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-white q-my-md">Portfolio Repository</h5>
          </div>
          <div class="row">
            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form class="q-gutter-md">
                  <q-input
                    square
                    filled
                    v-model="email"
                    type="email"
                    label="email"
                    @keyup.enter="signIn()"
                  />
                  <q-input
                    square
                    filled
                    v-model="password"
                    type="password"
                    label="password"
                    @keyup.enter="signIn()"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  color="light-blue-7"
                  size="lg"
                  class="full-width"
                  label="Sign in"
                  @click="signIn()"
                />
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    flex: 1;
                  "
                >
                  <q-btn
                    flat
                    color="light-blue-7"
                    size="md"
                    class="q-ma-sm"
                    label="Sign in with Google"
                    @click="signInWithGoogle()"
                  />
                  <q-btn
                    flat
                    color="light-blue-7"
                    size="md"
                    class="q-ma-sm"
                    label="Register"
                    @click="$router.push('/register')"
                  />
                </div>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const email = ref('');
const password = ref('');

const signIn = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      router.push('/');
      $q.notify({
        type: 'positive',
        message: 'Successfully signed!',
      });
    })
    .catch((err) => {
      $q.notify({
        type: 'negative',
        message: err.code,
      });
    });
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(getAuth(), provider)
    .then((data) => {
      router.push('/');
      $q.notify({
        type: 'positive',
        message: 'Successfully signed!',
      });
    })
    .catch((err) => {
      $q.notify({
        type: 'negative',
        message: err.code,
      });
    });
};
</script>
