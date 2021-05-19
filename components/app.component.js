Vue.component('app', {
    data() {
        return {
            left: false,
            columns: [
                    {
                      name: 'id',
                      required: true,
                      label: 'Title',
                      align: 'left',
                      field: row => row.id,
                      format: val => `${val}`,
                      sortable: true
                    },
                    { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true }
                  ],
            data: []

        }
    },
    created: function(){
        this.data = fetch("https://gft365.sharepoint.com/sites/testowa/_api/web/GetListUsingPath(DecodedUrl=@a1)/RenderListDataAsStream?@a1=%27%2Fsites%2Ftestowa%2FLists%2Fportfoliodata%27", {
          "headers": {

            "content-type": "application/json;odata=verbose",

          },
          "body": "{\"parameters\":{\"__metadata\":{\"type\":\"SP.RenderListDataParameters\"}}}",
          "method": "POST"
        }).then(response => response.json()).then(data => data.Row.map((row) => {
            return {id: row.ID, title: row.Title}
        }))
    },
    template: `
<q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          Portfolio
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="left" side="left" elevated>
      <div>
           <q-list dense padding class="rounded-borders">
             <q-item clickable v-ripple>
               <q-item-section>
                 Projects
               </q-item-section>
             </q-item>

             <q-item clickable v-ripple>
               <q-item-section>
                 Structure
               </q-item-section>
             </q-item>

             <q-item clickable v-ripple>
               <q-item-section>
                 Capabilities
               </q-item-section>
             </q-item>
           </q-list>
         </div>
    </q-drawer>

    <q-page-container>
      <q-table
            title="Treats"
            :data="data"
            :columns="columns"
            row-key="name"
          />
    </q-page-container>

  </q-layout>
    `
})