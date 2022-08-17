import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },

  {
    path: "/departamentos",
    name: "Departamentos",
    component: () => import("../views/Departamentos.vue"),
  },
  {
    path: "/cadastro",
    name: "Cadastros",
    component: () => import("../views/Cadastro.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
