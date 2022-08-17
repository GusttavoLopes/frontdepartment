<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h2>Departamentos</h2>
      </div>
      <div class="col-md-6">
        <button
          v-if="role === 'ROLE_ADMIN'"
          v-on:click="redirect"
          class="btn btn-primary pull-right"
        >
          CADASTRO
        </button>
      </div>
    </div>
    <br />
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Id</th>
          <th>Setor</th>
          <th>Funcionario</th>
          <th>Funcao</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="departamento in departamentos" :key="departamento.id">
          <td>{{ departamento.id }}</td>
          <td>{{ departamento.setor }}</td>
          <td>{{ departamento.funcionario }}</td>
          <td>{{ departamento.funcao }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import store from "../store";

export default {
  data() {
    return {
      Setor: "",
      departamento: "",
      departamentos: [],
      role: "",
    };
  },
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    deslogar() {
      localStorage.clear();
      store.commit("logout");
      window.location.href = "http://localhost:8081/";
      this.atualizar();
    },
    redirect() {
      window.location.href = "http://localhost:8081/cadastro";
    },
    alert() {
      alert("Sem permissão.");
    },
    cadastrar() {
      if (store.state.role == "ROLE_ADMIN") {
        const token = JSON.parse(localStorage.getItem("token"));
        axios
          .post(
            "http://localhost:8080/departamento/cadastrar",
            {
              setor: this.setor,
              funcionario: this.funcionario,
              funcao: this.funcao,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            console.log(res);
            this.setor = "";
            this.funcionario = "";
            this.funcao = "";
            this.atualizar();
          })
          .catch(() => this.alert());
      } else {
        alert("Você não é um usuário ADMIN para inserir dados.");
      }
    },
    atualizar() {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:8080/departamento/listar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          this.departamentos = res.data;
        })
        .catch((error) => {
          this.departamentos = [];
        });
    },
  },
  created() {
    this.atualizar();
    this.role = localStorage.getItem("role");
  },
};
</script>
