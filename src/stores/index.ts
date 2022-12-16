import { store } from 'quasar/wrappers';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { Router } from 'vue-router';

/*
 * When adding new properties to stores, you should also
 * extend the `PiniaCustomProperties` interface.
 * @see https://pinia.vuejs.org/core-concepts/plugins.html#typing-new-store-properties
 */
declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly router: Router;
  }
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  // console.log('pinia created');
  // pinia.use(({ store }) => {
  //   console.log('pinia plugin use', store);
  //   store.$subscribe(() => {
  //     // react to store changes
  //     console.log('Pinia subscribe', store);
  //   });
  //   store.$onAction(() => {
  //     // react to store actions
  //     console.log('Pinia onAction', store);
  //   });
  // });
  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia;
});
