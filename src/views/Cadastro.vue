<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h2>Departamentos</h2>
      </div>
    </div>
    <form @submit.prevent="cadastrar">
      <div class="form-group">
        <label for="setor">Setor</label>
        <input
          type="text"
          id="setor"
          class="form-control"
          required
          autofocus
          v-model="setor"
        />
      </div>
      <div class="form-group">
        <label for="funcionario">Funcionário</label>
        <textarea id="funcionario" class="form-control" required v-model="funcionario">
        </textarea>
      </div>
      <div class="form-group">
        <label for="funcao">Função</label>
        <textarea id="funcao" class="form-control" required v-model="funcao">
        </textarea>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Cadastrar
      </button>
    </form>
    <br />
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import store from "../store";

export default {
  data() {
    return {
      setor: "",
      departamento: "",
      departamentos: [],
    };
  },
  computed: {
    ...mapState(["usuario"]),
  },
  methods: {
    deslogar() {
      store.commit("logout");
      this.atualizar();
    },
    alert() {
      alert("Sem permissão.");
    },
    cadastrar() {
      const role = localStorage.getItem("role");
      if (role && role === "ROLE_ADMIN") {
        const token = localStorage.getItem("token");
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
            window.location.href = "http://localhost:8081/departamentos";
          })
          .catch(() => this.alert());
      } else {
        alert("Você não possui a permissão de ADMIN para inserir dados.");
      }
    },
    atualizar() {
      const token = JSON.parse(localStorage.getItem("token"));

      axios
        .get("http://localhost:8080/departamento/listar", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.departamentos = res.data;
          window.location.href = "http://localhost:8081/departamentos";
        })
        .catch((error) => {
          this.departamentos = [];
          console.log(error);
        });
    },
  },
  created() {
    this.atualizar();
  },
};
</script>
