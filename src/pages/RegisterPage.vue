<template>
  <q-layout view="lHh Lpr fff">
    <q-page-container class="bg-grey-2">
      <q-page
        class="bg-light-blue-7 window-height window-width row justify-center items-center"
      >
        <div class="column">
          <div class="row">
            <q-card square bordered class="q-pa-lg shadow-1">
              <q-card-section>
                <q-form class="q-gutter-md" style="width: 350px">
                  <q-input
                    square
                    filled
                    v-model="email"
                    type="email"
                    label="email"
                    @keyup.enter="register()"
                  />
                  <q-input
                    square
                    filled
                    v-model="password1"
                    type="password"
                    label="password"
                    @keyup.enter="register()"
                  />
                  <q-input
                    square
                    filled
                    v-model="password2"
                    type="password"
                    label="repeat password"
                    @keyup.enter="register()"
                  />
                </q-form>
              </q-card-section>
              <q-card-actions class="q-px-md">
                <q-btn
                  unelevated
                  color="light-blue-7"
                  size="lg"
                  class="full-width"
                  label="Register"
                  @click="register()"
                />
                <q-btn
                  flat
                  color="light-blue-7"
                  size="md"
                  class="full-width"
                  label="Sign-in"
                  @click="register()"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const router = useRouter();
const email = ref('');
const password1 = ref('');
const password2 = ref('');

const register = () => {
  if (!password1.value) {
    $q.notify({
      type: 'negative',
      message: "Password can't be empty.",
    });
    return;
  }
  if (password1.value != password2.value) {
    $q.notify({
      type: 'negative',
      message: "Password don't match!",
    });
    return;
  }

  createUserWithEmailAndPassword(getAuth(), email.value, password1.value)
    .then((data) => {
      $q.notify({
        type: 'positive',
        message: 'Successfully registered!',
      });
      router.push('/sign-in');
    })
    .catch((err) => {
      $q.notify({
        type: 'negative',
        message: err.code,
      });
    });
};
</script>
