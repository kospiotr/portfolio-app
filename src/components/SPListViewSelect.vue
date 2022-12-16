<template>
  <q-btn-dropdown
    dense
    flat
    icon="grid_view"
    :label="(selected && selected.title) || 'unknown'"
    ref="view"
  >
    <div class="row">
      <q-list dense style="width: 300px">
        <q-item>
          <q-item-section>
            <q-item-label header class="q-pa-sm">Predefined Views</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          style="padding: 0 30px 0 30px"
          v-for="n in views.filter((el) => el.custom !== true)"
          :key="n.id"
          clickable
          tabindex="0"
        >
          <q-item-section v-close-popup @click="selectView(n)">
            <span :class="{ 'text-bold': n.title == view.title }">{{
              n.title
            }}</span>
          </q-item-section>
          <q-item-section side @click="openView(n)">
            <q-item-label caption class="hover-visible">
              <q-icon name="remove_red_eye" color="primary" size="2em" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label header class="q-pa-sm">Custom Views</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn
              dense
              flat
              color="primary"
              icon="library_add"
              @click="addView()"
            >
              <q-tooltip>Create new view based on currently selected</q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
        <q-item
          style="padding: 0 10px 0 30px"
          v-for="n in views.filter((el) => el.custom)"
          :key="n.id"
          clickable
          tabindex="0"
        >
          <q-item-section v-close-popup @click="selectView(n)">
            <span :class="{ 'text-bold': n.title == view.title }">{{
              n.title
            }}</span>
          </q-item-section>
          <q-item-section side>
            <q-bar style="background: none" class="hover-visible">
              <q-btn
                color="negative"
                dense
                flat
                icon="delete"
                @click="deleteView()"
              >
                <q-tooltip>Delete view</q-tooltip>
              </q-btn>
              <q-btn
                color="primary"
                dense
                flat
                icon="edit"
                @click="openView(n)"
              >
                <q-tooltip>Edit view</q-tooltip>
              </q-btn>
            </q-bar>
          </q-item-section>
          <!-- <q-item-section side>
            <q-item-label caption class="hover-visible no-padding" @click="deleteView()">
              <q-icon name="delete" color="negative" size="2em" />
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption class="hover-visible no-padding" @click="openView(n)">
              <q-icon name="edit" color="primary" size="2em" />
            </q-item-label>
          </q-item-section> -->
        </q-item>
      </q-list>
      <div
        v-if="advanced"
        class="column"
        style="
          position: relative;
          border-left: 1px solid rgba(0, 0, 0, 0.12);
          width: 350px;
          min-height: 500px;
        "
      >
        <q-tabs
          v-model="tab"
          dense
          class="text-grey col-auto"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-btn
            color="primary"
            dense
            flat
            icon="arrow_left"
            @click="toggleViewDetails()"
          ></q-btn>
          <q-tab name="columns" label="Columns" />
          <q-tab name="filters" label="Filters" />
          <q-tab name="sorters" label="Sorters" />
        </q-tabs>
        <q-separator />

        <q-tab-panels
          v-model="tab"
          animated
          class="fit col"
          :class="{ 'light-dimmed': !view.custom }"
        >
          <q-tab-panel name="columns" class="fit no-padding">
            <q-scroll-area class="fit" visible>
              <q-list dense>
                <q-item
                  header
                  v-for="(column, columnIndex) in viewColumns"
                  v-bind:key="column.label"
                >
                  <q-item-section>
                    <q-item-label>{{ column.label }}</q-item-label>
                  </q-item-section>
                  <q-item-section avatar>
                    <q-bar style="background: none" class="no-padding">
                      <q-btn
                        color="primary"
                        dense
                        flat
                        icon="arrow_drop_up"
                        v-if="columnIndex > 0 && column.visible"
                        @click="moveColumn(columnIndex, columnIndex - 1)"
                      />
                      <q-btn
                        color="primary"
                        dense
                        flat
                        icon="arrow_drop_down"
                        :style="{
                          visibility:
                            columnIndex < viewColumns.length - 1 &&
                            column.visible &&
                            viewColumns[columnIndex + 1].visible
                              ? null
                              : 'hidden',
                        }"
                        @click="moveColumn(columnIndex, columnIndex + 1)"
                      />
                      <q-toggle
                        dense
                        :disable="view.custom !== true"
                        v-model="column.visible"
                        @update:modelValue="
                          (newValue) => (viewColumns = viewColumns)
                        "
                      />
                    </q-bar>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-scroll-area>
          </q-tab-panel>
          <q-tab-panel name="filters" class="column fit q-pa-sm">
            <pre class="no-margin">function(el){ </pre>
            <textarea
              class="no-border no-outline bg-blue-grey-1 col-grow q-pa-sm"
              v-model="view.filter"
            />
            <pre class="no-margin">} //must return boolean</pre>
          </q-tab-panel>

          <q-tab-panel name="sorters" class="column fit q-pa-sm">
            <pre class="no-margin">function(a,b){ </pre>
            <textarea
              class="no-border no-outline bg-blue-grey-1 col-grow q-pa-sm"
              v-model="view.sorter"
            ></textarea>
            <pre class="no-margin">} //must return number</pre>
          </q-tab-panel>
        </q-tab-panels>
        <!-- <q-separator />
        <q-bar style="background: none">
          <q-btn
            color="primary"
            dense
            flat
            icon="arrow_left"
            @click="toggleViewDetails()"
          >
            <q-tooltip>Hide view details</q-tooltip>
          </q-btn>
          <q-btn
            color="primary"
            dense
            flat
            icon="delete"
            v-if="view.custom"
            @click="deleteView()"
          >
            <q-tooltip>Remove current view</q-tooltip>
          </q-btn>
          <q-space />
          <q-btn
            color="primary"
            dense
            flat
            icon="content_copy"
            @click="onNewViewPromptShow"
          >
            <q-tooltip>Create new view based on currently selected</q-tooltip>
          </q-btn>
        </q-bar> -->
      </div>
      <q-dialog v-model="newViewDialog">
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Create new view</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-field
              autofocus
              :dense="dense"
              :error-message="newViewErrors.join(' ')"
              :error="newViewErrors.length > 0"
            >
              <q-input
                label="Name"
                dense
                v-model="viewName"
                autofocus
                @keyup.enter="onNewViewSave(viewName)"
              />
            </q-field>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Create" @click="onNewViewSave(viewName)" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-btn-dropdown>
</template>
<style lang="sass">
.q-item:hover .hover-visible
  visibility: visible
.hover-visible
  visibility: hidden
</style>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'sp-list-view-select',
  // expose: ["selectedOrDefault"],
  emits: {
    onSelect: null,
    onViewCreated: null,
    onViewUpdated: null,
  },
  data() {
    return {
      advanced: false,
      newViewDialog: false,
      newViewErrors: [],
      tab: 'columns',
    };
  },
  props: {
    views: {
      required: true,
    },
    selected: {
      required: false,
    },
    columns: {
      required: false,
    },
  },
  computed: {
    view() {
      return this.selected;
    },
    viewColumns: {
      get() {
        const currentColumns = this.view.columns;
        const allColumnDefs = this.columns;
        const visibleColumns = currentColumns
          .map((currentColumn) => {
            return allColumnDefs.find((def) => def.label === currentColumn);
          })
          .map((el) => Object.assign({}, el, { visible: true }));

        const invisibleColumns = allColumnDefs
          .filter(
            (def) =>
              !currentColumns.some(
                (currentColumn) => def.label === currentColumn
              )
          )
          .map((el) => Object.assign({}, el, { visible: false }));

        return [...visibleColumns, ...invisibleColumns];
      },
      set(value) {
        const newColumns = value.reduce((acc, el) => {
          if (el.visible) {
            acc.push(el.label);
          }
          return acc;
        }, []);
        const updatedView = Object.assign({}, this.view, {
          columns: newColumns,
        });
        this.$emit('onViewUpdated', updatedView);
      },
    },
  },
  methods: {
    selectView(view) {
      this.$refs.view.hide();
      this.advanced = false;
      this.$emit('onSelect', view.title);
    },
    openView(view) {
      this.$refs.view.hide();
      this.advanced = true;
      this.$emit('onSelect', view.title);
      this.$refs.view.show();
    },
    onNewViewPromptShow() {
      this.viewName = this.view.title;
      this.newViewDialog = true;
      this.newViewErrors = [];
    },
    newViewValidate(viewName) {
      const errors = [];
      if (viewName.length === 0) {
        errors.push('Name length must be empty.');
      }
      if (this.views.find((view) => view.title === viewName)) {
        errors.push(`View with name: '${viewName}' already exists.`);
      }
      return errors;
    },
    addView() {
      this.onNewViewPromptShow();
    },
    deleteView() {
      this.$emit('onViewDeleted', this.view);
      this.toggleViewDetails();
    },
    onNewViewSave(newViewName) {
      this.newViewErrors = this.newViewValidate(newViewName);
      if (this.newViewErrors.length === 0) {
        this.$q.notify({
          type: 'positive',
          message: `Created new view '${newViewName}'`,
        });
        this.newViewDialog = false;
        this.$emit('onViewCreated', {
          title: newViewName,
          custom: true,
          columns: this.view.columns,
          filter: this.view.filter,
          sorter: this.view.sorter,
        });
      }
    },
    toggleViewDetails() {
      this.advanced = !this.advanced;
      this.$refs.view.hide();
      this.$refs.view.show();
    },
    moveColumn(fromIndex, toIndex) {
      const arr = this.viewColumns;
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
      this.viewColumns = arr;
    },
  },
  async mounted() {
    // this.$refs.view.show();
  },
});
</script>
