<template>
  <q-tabs
    v-model="tab"
    dense
    class="bg-primary text-white shadow-2"
    align="justify"
    narrow-indicator
  >
    <q-route-tab label="Portfolio" to="/data/portfolio" exact />
    <q-route-tab
      label="Kimble engagements"
      to="/data/kimble-engagements"
      exact
    />
    <q-route-tab label="State" to="/data/state" exact />
  </q-tabs>
  <q-page class="flex fit column">
    <q-tab-panel>
      <router-view />
    </q-tab-panel>
  </q-page>
</template>
