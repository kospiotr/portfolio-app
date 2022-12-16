<template>
  <q-layout view="lHh Lpr fff" class="bg-grey-4">
    <q-header elevated>
      <q-toolbar class="bg-primary text-white q-gutter-x-md">
        <q-btn
          flat
          dense
          stack
          size="sm"
          icon="home"
          label="Home"
          @click="$router.push('/')"
        />
        <q-btn
          flat
          dense
          stack
          size="sm"
          icon="assignment"
          label="Projects"
          @click="$router.push('/projects')"
        />
        <q-btn flat dense stack size="sm" icon="analytics" label="Analytics" />
        <q-space />
        <q-toolbar-title
          v-if="$q.screen.gt.sm"
          shrink
          class="row items-center no-wrap"
        >
          <span class="q-ml-sm">Portfolio Repository</span>
        </q-toolbar-title>
        <q-space />
        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="sass">
.GPL
  &__toolbar
    height: 64px
  &__toolbar-input
    width: 35%
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368
    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px
  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500
  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px
</style>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
const router = useRouter();
const leftDrawerOpen = ref(false);
const search = ref('');
const storage = ref(0.26);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
const isLoggedIn = ref(false);
const links1 = [
  { icon: 'photo', text: 'Photos' },
  { icon: 'photo_album', text: 'Albums' },
  { icon: 'assistant', text: 'Assistant' },
  { icon: 'people', text: 'Sharing' },
  { icon: 'book', text: 'Photo books' },
];
const links2 = [
  { icon: 'archive', text: 'Archive' },
  { icon: 'delete', text: 'Trash' },
];
const links3 = [
  { icon: 'settings', text: 'Settings' },
  { icon: 'help', text: 'Help & Feedback' },
  { icon: 'get_app', text: 'App Downloads' },
];
const createMenu = [
  { icon: 'photo_album', text: 'Album' },
  { icon: 'people', text: 'Shared Album' },
  { icon: 'movie', text: 'Movie' },
  { icon: 'library_books', text: 'Animation' },
  { icon: 'dashboard', text: 'Collage' },
  { icon: 'book', text: 'Photo book' },
];

onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
    isLoggedIn.value = user ? true : false;
  });
});

const handleSignOut = () => {
  signOut(getAuth()).then(() => {
    router.push('/sign-in');
  });
};

const handleSignIn = () => {
  router.push('/sign-in');
};
</script>
