<template>
  <q-scroll-area style="height: 800px">
    <code>
      <pre style="font-size: x-small">{{ state }}</pre>
    </code>
  </q-scroll-area>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  computed: {
    state: function () {
      return this.$store.state;
    },
  },
});
</script>
