import { defineStore } from 'pinia';

export const useStore = defineStore('projects', {
  state: () => ({
    tab: 'home',
    view: null,
    searchText: '',
    datasource: {
      type: 'local',
      config: {
        data: [],
      },
    },
    customViews: [],
  }),
  getters: {
    columns() {
      return [
        'Project Name',
        'Status',
        'Client Unit',
        'Client Name',
        'Client Unit Country',
        'Delivery Manager',
        'Team Lead',
        'Last update date',
        'Test',
      ].map((el) => {
        return Object.assign(
          {},
          {
            name: el,
            label: el,
            field: el,
            sortable: true,
            align: 'left',
          }
        );
      });
    },
    predefinedViews(state) {
      return [
        {
          title: 'Default',
          columns: [
            'Project Name',
            'Status',
            'Client Unit',
            'Client Name',
            'Client Unit Country',
            'Delivery Manager',
            'Team Lead',
            'Last update date',
          ],
          sorter:
            "return a['Project Name'] < b['Project Name'] ? -1 : a['Project Name'] > b['Project Name'] ? 1 : 0;",
        },
        {
          title: 'Simple',
          columns: ['Project Name', 'Status', 'Client Unit'],
          sorter: 'return 1;',
        },
        {
          title: 'Open',
          columns: [
            'Project Name',
            'Status',
            'Client Unit',
            'Client Name',
            'Client Unit Country',
            'Delivery Manager',
            'Team Lead',
            'Last update date',
          ],
          filter: 'return el.Status == "Open";',
          sorter: 'return 1;',
        },
      ];
    },
    views(state) {
      return [...state.predefinedViews, ...state.customViews];
    },

    defaultView(state) {
      return state.views.find((el) => el.title == 'Default');
    },

    getView(state) {
      return (
        state.views.find((el) => el.title == state.view) ||
        state.views.find((el) => el.title == 'Default')
      );
    },

    viewColumns(state) {
      return state.getView.columns.map((viewColumn) =>
        state.columns.find((column) => column.label === viewColumn)
      );
    },
    getDatasource(state) {
      return {
        getItems() {
          return state.datasource.config.data;
        },
      };
    },
    items(state) {
      let out = state.getDatasource.getItems();
      let searchText = state.searchText;
      if (searchText) {
        searchText = searchText.toLowerCase();
        const columns = state.viewColumns;
        out = out.filter((el) => {
          return columns.find((column) => {
            const value = el[column.label];
            return value && value.toLowerCase().includes(searchText);
          });
        });
      }
      let filterBody = state.getView.filter;
      if (filterBody) {
        filterBody = 'return function( el,index ){ ' + filterBody + ' }';
        const filterFn = new Function([], filterBody).call(null);
        out = out.filter((el) => filterFn.call(null, el));
      }
      let sorterBody = state.getView.sorter;
      if (sorterBody) {
        sorterBody = 'return function( a,b ){ ' + sorterBody + ' }';
        const sorterFn = new Function([], sorterBody).call(null);
        out.sort((a, b) => sorterFn.call(null, a, b));
      }
      return out;
    },
  },
  actions: {
    async createView(data) {
      if (!this.customViews) {
        this.customViews = [];
      }
      this.customViews.push(data);
    },
    updateView(data) {
      const existingViewIndex = this.customViews.findIndex(
        (view) => view.title === data.title
      );

      if (existingViewIndex >= 0) {
        this.customViews[existingViewIndex] = data;
      }
    },
    deleteView(data: string) {
      const existingViewIndex = this.customViews.findIndex(
        (view) => view.title === data.title
      );
      if (existingViewIndex >= 0) {
        this.customViews.splice(existingViewIndex, 1);
      }
    },
  },
  persist: true,
});
