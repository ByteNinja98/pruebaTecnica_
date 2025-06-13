<template>
  <div class="overflow-x-auto">
    <table class="table-auto border-collapse border border-gray-300 w-full shadow-lg rounded-lg">
      <thead class="bg-gray-100">
        <tr>
          <th 
            v-for="(header, index) in headers" 
            :key="index" 
            class="px-4 py-2 border border-gray-300 text-left font-semibold text-gray-700"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr 
          v-for="(row, index) in rows" 
          :key="index" 
          class="even:bg-gray-50 hover:bg-gray-100 transition"
        >
          <td 
            v-for="(value, idx) in Object.values(row)" 
            :key="idx" 
            class="px-4 py-2 border border-gray-300 text-gray-600"
          >
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    headers: { type: Array, required: true },
    rows: { type: Array, required: true },
  },
};
</script>
