<template>
  <div id="app" class="container">
    <div id="nav" class="row text-center">
      <router-link to="/">Login </router-link> |

      <router-link to="/home">Home</router-link> |
      <router-link to="/departamentos">Departamentos</router-link> |
      <router-link to="/cadastro">Cadastro</router-link>
    </div>
    <router-view />
  </div>
</template>
