<template>
  <div id="app">
    <h1>Critter Tracker</h1>
    <div id="nav">
      <router-link to="/">All Critters</router-link> |
      <router-link to="/critters-active">Critters Active</router-link> |
      <router-link to="/critters-leaving">Critters Leaving!</router-link> |
      <router-link to="/critters-new">New Critters This Month</router-link>
    </div>
    <router-view/>
  </div>
</template>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
@import url('styles/site.scss');
#app {
  font-family: 'Roboto Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
