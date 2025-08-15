<script>
import TableConfig from '@/components/admin/table/TableConfig.vue';

export default {
  components: {
    TableConfig,
  },
  methods: {
    handleConfigUpdate(config) {
      console.log('Configuração Atualizada:', config);
    },
  },
};
</script>

<template>
  <div>
    <TableConfig :additional-filters="filters" @update-config="handleConfigUpdate" />
  </div>
</template>