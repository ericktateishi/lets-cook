<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/favorites">Favorites<sup :class="{show: hasFavorite}">{{favorites.length}}</sup></router-link>
    </nav>
    <router-view @addFavorite="addFavorite" :favorites="favorites"/>
  </div>
</template>

<script>
import constants from "./assets/Constants.js"

export default {
  data () {
    return {
      favorites: []
    }
  },
  computed: {
    hasFavorite: function(){
      return this.favorites.length == 0
    }
  },
  methods: {
    addFavorite: function (elem){
      this.favorites.push(elem)
    }
  }
}
</script>


<style lang="scss">
@import "assets/styles/main.scss";

</style>
