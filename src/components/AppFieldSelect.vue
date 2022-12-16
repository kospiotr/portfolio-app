<template>
  <q-select
    v-model="value"
    outlined
    dense
    :label="props.field.label"
    :options="props.field.options"
  />
  <!-- <q-field :label="props.field.label" stack-label borderless>
    <div class="row q-col-gutter-x-md">
      <q-option-group
        v-model="model"
        :options="props.field.options"
        type="checkbox"
        inline
      />
    </div>
  </q-field> -->
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  field: Object,
  modelValue: Object,
});
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    console.log('changed', value);
    emit('update:modelValue', value);
  },
});
</script>

// import { ref, defineProps } from 'vue'; // const props = defineProps({ //
label: String, // options: Array, // field: Object, // modelValue: Array, // });
// const emit = defineEmits(['update:modelValue']);
