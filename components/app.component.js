Vue.component('app', {
    data() {
        return {
            left: false
        }
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
      <div style="max-width: 350px">
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
      <router-view />
    </q-page-container>

  </q-layout>
    `
})