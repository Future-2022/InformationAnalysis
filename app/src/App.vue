<template>
  <div id="app">
    <nav>
      <div class='inline'>
        <div class='d-flex'>
          <router-link to="/" class='mx-5'>
            <v-icon
              class='align-self-center text-white px-2'
            >
              mdi-home
            </v-icon>
            Input data
          </router-link> 
          <div class='text-white'>|</div>
          <router-link to="/about" class='mx-5'>
            <v-icon
              class='align-self-center text-white px-2'
            >
              mdi-database
            </v-icon>
            Detail information
          </router-link>
          <div class='text-white'>|</div>
          <router-link to="/edit" class='mx-5'>
            <v-icon
              class='align-self-center text-white px-2'
            >
              mdi-wrench
            </v-icon>
            Edit Data
          </router-link>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 15px;
  margin-bottom:15px;
  background-color: #356eb5;
  a {
    font-weight: bold;
    color: white;
    text-decoration: none;
    font-size: 18px;

    &.router-link-exact-active {
      color: #51c1f7;
    }
  }
}
</style>
