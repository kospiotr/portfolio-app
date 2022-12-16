<template>
  <q-card>
    <q-card-actions class="bg-primary text-white">
      <div class="text-subtitle1">Kimble engagements</div>
      <q-space />
      <q-btn label="Upload file" @click="uploadDialog = true" />

      <q-dialog v-model="uploadDialog">
        <q-card>
          <q-bar>
            <div>Upload</div>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup> </q-btn>
          </q-bar>
          <q-card-section>
            <p>
              Step 1: Open Engagements report
              <a
                target="_blank"
                href="https://gft.lightning.force.com/lightning/r/Report/00O7R000008ioYMUAY/view"
                >link</a
              >
            </p>
            <p>Step 2: Export data with details to Excel with encoding UTF-8</p>
            <p>Step 4: Upload file using below form:</p>
            <q-file
              v-model="file"
              label="select file"
              filled
              style="width: 400px"
            >
            </q-file>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn label="Upload" @click="uploadData()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card-actions>
    <q-separator />
    <q-card-section class="no-padding">
      <q-list separator>
        <q-item v-for="item in snapshots" :key="item.name">
          <q-item-section>
            <q-item-label
              ><b>timestamp:</b> {{ item.name }} <b>size:</b>
              {{ item.size }}</q-item-label
            >
          </q-item-section>

          <q-item-section side v-if="isCurrent(item)">
            <q-icon name="check_circle" color="positive" />
          </q-item-section>

          <q-item-section side>
            <q-btn label="Use" @click="use(item)" />
          </q-item-section>

          <q-item-section side>
            <q-btn label="Delete" @click="deleteItem(item)" />
          </q-item-section>
        </q-item>
        <q-item v-if="snapshots.length == 0">
          <p class="absolute-center">No Items</p>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue';

export default defineComponent({
  components: {},
  name: 'PageProjects',
  data() {
    return {
      tab: ref('mails'),
      file: ref(null),
      uploadDialog: ref(false),
      snapshots: [],
    };
  },
  computed: {},
  methods: {
    init: async function () {
      this.load();
    },
    load: async function () {
      console.log('Loading');
      this.snapshots = Object.keys(localStorage)
        .filter((el) => el.startsWith('kimble-engagements '))
        .map((el) =>
          Object.assign({
            name: el.replace('kimble-engagements ', ''),
            path: el,
            size: localStorage.getItem(el).length,
          })
        );
    },
    uploadData: async function () {
      console.log('store', this.$store);
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this;
      function parse(data) {
        return new Promise((resolve) => {
          var dt = XLSX.read(data, {
            type: 'binary',
          });
          const first_worksheet = dt.Sheets[dt.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(first_worksheet);
          resolve(jsonData);
        });
      }
      const reader = new FileReader();
      reader.readAsBinaryString(this.file);
      reader.onload = async function (e) {
        const timestamp = new Date().toISOString();
        const data = await parse(e.target.result);
        const stringData = JSON.stringify(data);
        localStorage.setItem('kimble-engagements ' + timestamp, stringData);
        self.$store.commit('setRawKimbleEngagements', stringData);
        self.uploadDialog = false;
        self.load();
      };
      reader.onerror = (evt) => {
        alert('error', evt);
      };
    },
    deleteItem: function (item) {
      localStorage.removeItem(item.path);
      this.load();
    },
    clear: function () {
      this.$store.commit('setRawKimbleEngagements', null);
      this.load();
    },
    use: function (item) {
      const data = localStorage.getItem(item.path, item.path);

      this.$store.commit('setRawKimbleEngagements', data);
      this.load();
    },
    isCurrent: function (item) {
      const data = localStorage.getItem(item.path, item.path);
      return this.$store.state.root.kimbleEngagements.raw == data;
    },
  },
  async mounted() {
    this.init();
  },
});
</script>
