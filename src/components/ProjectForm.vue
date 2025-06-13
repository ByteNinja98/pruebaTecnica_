<template>
  <form @submit.prevent="submitForm" class="bg-white p-4 shadow-md rounded-md">
    <div class="mb-4">
      <label for="name" class="block text-gray-700">Nombre del Proyecto</label>
      <input
        v-model="form.name"
        type="text"
        id="name"
        class="border px-4 py-2 w-full"
        :class="{'border-red-500': $v.form.name.$error}"
      />
      <span v-if="$v.form.name.$error" class="text-red-500 text-sm">El nombre es obligatorio.</span>
    </div>
    <div class="mb-4">
      <label for="status" class="block text-gray-700">Estado</label>
      <select v-model="form.status" id="status" class="border px-4 py-2 w-full">
        <option value="active">Activo</option>
        <option value="inactive">Inactivo</option>
      </select>
    </div>
    <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
  </form>
</template>

<script>
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export default {
  props: {
    initialData: { type: Object, default: () => ({}) },
    onSubmit: { type: Function, required: true },
  },
  setup(props) {
    const form = reactive({ name: '', status: 'active', ...props.initialData });

    const rules = {
      name: { required },
    };

    const $v = useVuelidate(rules, form);

    const submitForm = () => {
      $v.value.$validate();
      if (!$v.value.$error) {
        props.onSubmit(form);
      }
    };

    return { form, $v, submitForm };
  },
};
</script>
