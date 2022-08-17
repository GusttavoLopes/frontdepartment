<template>
  <div class="text-center">
    <h1>Cadastro de Departamentos</h1>
    <p>Setor - Funcionário - Função</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      componentKey: 0,
    };
  },
  methods: {
    forceRerender() {
      this.componentKey += 1;
    },
  },
};
</script>
