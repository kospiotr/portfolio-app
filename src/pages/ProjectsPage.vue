<template>
  <q-page class="flex column">
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" />
    </q-page-sticky>

    <div
      class="fit col-grow q-pa-md"
      style="gap: 15px"
      :class="{
        row: $q.screen.gt.sm,
        column: $q.screen.lt.md,
        reverse: $q.screen.lt.md,
      }"
    >
      <div class="col-grow" style="position: relative">
        <q-table
          dense
          virtual-scroll
          class="absolute-full"
          :rows-per-page-options="[0]"
          :rows="items"
          :columns="columns"
          row-key="ID"
          @row-click="rowClick"
          :loading="loading"
          separator="vertical"
        >
        </q-table>
      </div>
      <div
        :style="{
          width: $q.screen.lt.md ? '100%' : '400px',
        }"
      >
        <q-card>
          <q-card-section class="bg-primary text-white" style="font-size: 16px">
            Filters
          </q-card-section>
          <div
            class="q-pa-md q-gutter-md"
            :class="{
              row: $q.screen.lt.md,
            }"
          >
            <q-input
              v-model="filters.title.value"
              label="Title"
              outlined
              :dense="true"
            />
            <q-select
              v-model="filters.client_unit.value"
              outlined
              use-input
              multiple
              use-chips
              input-debounce="0"
              label="Client Unit"
              :options="filters.client_unit.options"
              behavior="menu"
              :dense="true"
            >
            </q-select>
            <q-select
              outlined
              v-model="filters.country.value"
              use-input
              multiple
              use-chips
              input-debounce="0"
              label="Country"
              :options="filters.country.options"
              behavior="menu"
              :dense="true"
            >
            </q-select>
            <div style="display: flex; flex-direction: row">
              <q-input
                label="Start Date from"
                outlined
                v-model="filters.startDateFrom"
                mask="date"
                :rules="['date']"
                :dense="true"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="filters.startDateFrom">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <span class="q-px-sm">-</span>
              <q-input
                label="Start Date to"
                outlined
                v-model="filters.startDateTo"
                mask="date"
                :rules="['date']"
                :dense="true"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="filters.startDateTo">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div style="display: flex; flex-direction: row">
              <q-input
                label="End Date from"
                outlined
                v-model="filters.endDateFrom"
                mask="date"
                :rules="['date']"
                :dense="true"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="filters.endDateFrom">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <span class="q-px-sm">-</span>
              <q-input
                label="End Date to"
                outlined
                v-model="filters.endDateTo"
                mask="date"
                :rules="['date']"
                :dense="true"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="filters.endDateTo">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            buttonfield
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <q-select
              outlined
              v-model="filters.tags.value"
              color
              use-inputfield
              multiple
              use-chips
              input-debounce="0"
              label="Tags"
              :options="filters.tags.options"
              behavior="menu"
              :dense="true"
            ></q-select>
          </div>
          <q-card-actions align="right">
            <q-btn color="primary" @click="doFilter()">Filter</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss"></style>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'stores/projects';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from 'boot/firebase';
// import { useRouter } from 'vue-router';
// const router = useRouter();

const store = useStore();

export default defineComponent({
  name: 'PageProjects',
  data() {
    return {
      loading: false,
      items: [],
      filters: {
        title: {
          value: '',
        },
        client_unit: {
          value: [],
          options: ['HSBC', 'DB', 'IDU PL'],
        },
        country: {
          value: [],
          options: ['UK', 'PL'],
        },
        status: {
          value: [],
          options: ['Open', 'Closed'],
        },
        status: {
          value: [],
          options: ['Open', 'Closed'],
        },
        startDateFrom: null,
        startDateTo: null,
        endDateFrom: null,
        endDateTo: null,
        tags: {
          value: [],
          options: ['T&M', 'Strategic', 'FixPrice'],
        },
      },
    };
  },
  computed: {
    searchText: {
      get() {
        return store.searchText;
      },
      set(value) {
        store.searchText = value;
      },
    },
    tab: {
      get() {
        return store.tab;
      },
      set(value) {
        store.tab = value;
      },
    },
    columns() {
      return store.viewColumns;
    },
    allColumns() {
      return store.columns;
    },
    views() {
      return store.views;
    },
    view: {
      get() {
        return store.getView;
      },
      set(value) {
        store.view = value;
      },
    },
    // items() {
    //   return store.items;
    // },
  },
  methods: {
    init: async function () {
      // console.log("Init");
      // const views = await portfolio.getViews();
      // console.log("Views", views);
      // this.views = views;
      // this.load();
    },
    async doFilter() {
      const projectOldRef = collection(db, 'project_old');
      const q = query(projectOldRef);
      const querySnapshot = await getDocs(q);
      this.items = querySnapshot.docs.map((doc) =>
        Object.assign({ id: doc.id }, doc.data())
      );
    },
    rowClick(evt, row, index) {
      this.$router.push({ path: '/project', query: { id: row.id } });
    },
    load: async function () {
      // console.log("Loading");
      // const data = await portfolio.getListItems();
      // this.data.rows = data;
      // console.log("Data", data);
    },
  },
  async mounted() {
    // console.log('Component is mounted!');
    // this.init();
    this.doFilter();
  },
});
</script>
