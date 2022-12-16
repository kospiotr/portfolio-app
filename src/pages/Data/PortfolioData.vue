<template>
  <q-card>
    <q-card-actions class="bg-primary text-white">
      <div class="text-subtitle1">Portfolio</div>
      <q-space />
      <q-btn label="Upload file" @click="uploadDialog = true" />
      <q-btn label="Load from SP" />

      <q-dialog v-model="uploadDialog">
        <q-card>
          <q-bar>
            <div>Upload</div>
            <q-space />
            <q-btn dense flat icon="close" v-close-popup> </q-btn>
          </q-bar>
          <q-card-section>
            <p>
              Step 1: Open Portfolio on Sharepoint
              <a
                target="_blank"
                href="https://share.gft.com/sites/GFTPoland/ProjectPortfolio/Lists/Project%20Portfolio/PersonalViews.aspx?PageView=Personal&ShowWebPart={F28B7F2B-7ABC-41BF-B2CA-62691EE35114}"
                >link</a
              >
            </p>
            <p>Step 2: Export data to Excel</p>
            <p>Step 3: Open file, load data and save spradsheet as XLSX</p>
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
import { useStore } from 'stores/projects';

const store = useStore();

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
      this.snapshots = Object.keys(localStorage)
        .filter((el) => el.startsWith('portfolio '))
        .map((el) =>
          Object.assign({
            name: el.replace('portfolio ', ''),
            path: el,
            size: localStorage.getItem(el).length,
          })
        );
    },
    uploadData: async function () {
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
        const name = 'portfolio ' + timestamp;
        localStorage.setItem(name, stringData);
        self.uploadDialog = false;
        self.use(name);
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
      store.data = null;
      this.load();
    },
    use: function (item) {
      const data = localStorage.getItem(item.path, item.path);
      store.datasource.config.data = JSON.parse(data);
      this.load();
    },
    isCurrent: function (item) {
      console.log(item);
      const data = localStorage.getItem(item.path, item.path);
      return JSON.stringify(store.datasource.config.data) == data;
      return true;
    },
  },
  async mounted() {
    this.init();
  },
});
</script>
