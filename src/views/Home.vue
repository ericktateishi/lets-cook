<template>
  <main class="home">
    <h2>What do you want to cook today?</h2>
    <Request :loading="loading" :error="error"></Request>
    <section>
      <div class="search-box">
        <input type="text" v-model="form.search" placeholder="Type a recipe name" class="txt-field search-field" v-on:keyup.13="search()" v-focus>
        <button class="search-btn" v-on:click="search()">Find now</button>
        <button class="filters-btn" v-on:click="filters = !filters">{{filters ? "&#9651;" : "&#9661;"}}</button>
      </div>
      <transition name="slide-fade">
        <div class="filters" v-if="filters">
          <p>You can use this filters to make your search better</p>
          <div class="slider-box">
            <label>Max. ingredients</label>
            <input type="range" v-model="form.ingredients" min="1" max="16" class="slider-field"/>
            <span>{{form.ingredients == 16 ? "no-limit" : form.ingredients}}</span>
          </div>
          <div class="slider-box">
            <label>Max. Calories</label>
            <input type="range" v-model="form.calories" min="20" max="601" class="slider-field"/>
            <span>{{form.calories == 601 ? "no-limit" : form.calories}}</span>
          </div>
          <div class="slider-box">
            <label>Max. Time (in minutes)</label>
            <input type="range" v-model="form.time" min="5" max="61" class="slider-field"/>
            <span>{{form.time == 61 ? "no-limit" : form.time}}</span>
          </div>
          <div class="selection-group">
            <label>Diet</label>
            <div class="selection-box selection-radio">
              <input type="radio" v-model="form.diet" value="balanced" id="balanced"/>
              <label for="balanced">Balanced</label>
            </div>
            <div class="selection-box selection-radio">
              <input type="radio" v-model="form.diet" value="high-protein" id="high-protein"/>
              <label for="high-protein">High Protein</label>
            </div>
            <div class="selection-box selection-radio">
              <input type="radio" v-model="form.diet" value="high-fiber" id="high-fiber"/>
              <label for="high-fiber">High Fiber</label>
            </div>
            <div class="selection-box selection-radio">
              <input type="radio" v-model="form.diet" value="low-fat" id="low-fat"/>
              <label for="low-fat">Low Fat</label>
            </div>
            <div class="selection-box selection-radio">
              <input type="radio" v-model="form.diet" value="low-carb" id="low-carb"/>
              <label for="low-carb">Low Carb</label>
            </div>
          </div>
          <div class="selection-group">
            <label>Health</label>
            <div class="selection-box selection-checkbox">
              <input type="checkbox" v-model="form.health" value="sugar-conscious" id="sugar-conscious"/>
              <label for="sugar-conscious">Less than 4g of sugar</label>
            </div>
            <div class="selection-box selection-checkbox">
              <input type="checkbox" v-model="form.health" value="tree-nut-free" id="tree-nut-free"/>
              <label for="tree-nut-free">Tree Nut Free</label>
            </div>
            <div class="selection-box selection-checkbox">
              <input type="checkbox" v-model="form.health" value="alcohol-free" id="alcohol-free"/>
              <label for="alcohol-free">Alcohol Free</label>
            </div>
            <div class="selection-box selection-checkbox">
              <input type="checkbox" v-model="form.health" value="vegan" id="vegan"/>
              <label for="vegan">Vegan</label>
            </div>
            <div class="selection-box selection-checkbox">
              <input type="checkbox" v-model="form.health" value="vegetarian" id="vegetarian"/>
              <label for="vegetarian">Vegetarian</label>
            </div>
            <div class="selection-box selection-checkbox">
              <input type="checkbox" v-model="form.health" value="peanut-free" id="peanut-free"/>
              <label for="peanut-free">Peanut Free</label>
            </div>
          </div>
          <div class="multiple-txt-box">
            <div v-for="(field, index) in form.notContain" :key="index">
              <input type="text" v-model="form.notContain[index]" placeholder="Don't contain this ingredient" class="txt-field"/>
            </div>
            <button v-on:click="addNewNotContain()">Add other food</button>
            <span v-if="errorAdd">{{errorAdd}}</span>
          </div>
        </div>
      </transition>
    </section>
    <div v-if="result != null" class="results">
      <div v-if="result.hits.length > 0">
        <p>We found {{result.count}} result(s)</p>

        <Card v-for="(recipe, index) in result.hits" :key="index" :recipe="recipe" @addFavorite="addFavorite">
        </Card>

        <button v-if="result.count > loadCounter" v-on:click="search(true)" class="load-more">Load more</button>
      </div>
      <p v-else>Sorry, but we have no results for your search</p>
      
    </div>
  </main>
</template>

<script>
import constants from "../assets/Constants.js"
import Request from "../components/RequestResponse.vue"
import Card from "../components/Card.vue"

export default {
  name: 'Favorites',
  components: {
    Request,
    Card
  },
  data () {
    return {
      form : {
        search: "",
        ingredients: 16,
        diet: "",
        health: [],
        calories: 601,
        time: 61,
        notContain: [""],
      },
      errorAdd: null,
      loading: false,
      error: false,
      result: null,
      filters: true,
      loadCounter: 0,
      load: 15
    }
  },
  methods: {
    addNewNotContain: function (){
      if (this.form.notContain.every(element => element != "")){
        this.form.notContain.push('')
        this.errorAdd = null
      }
      else 
        this.errorAdd = "last field has no value"
    },
    search: function (more){
      this.loading = true
      
      if (this.form.search.length < 1){
        this.errorAdd = "The search field is required"
        this.loading = false
        return
      }
      console.log(constants.server + this.request)

      constants.axios.get(constants.server + this.request)
      .then(response => {
        if (more) {
          response.data.hits.forEach(element => {
            this.result.hits.push(element)
          })
          this.loadCounter += this.load
        }
        else {
          this.result = response.data
          this.loadCounter = 0
        }

        this.filters = false
      })
      .catch(e => {
        this.error = e
      })
      .finally(() => 
        this.loading = false
      )
    },
    addFavorite: function (recipe){
      this.$emit('addFavorite', recipe)
    }
  },
  computed: {
    request: function (){
      let request = "q=" + this.form.search
      
      if (this.form.ingredients < 16)
        request += "&ingr=" + this.form.ingredients

      if (this.form.diet.length > 0)
        request += "&diet=" + this.form.diet

      if (this.form.health.length > 0){
        this.form.health.forEach(element => {
          request += "&health=" + element
        })
      }
      
      if (this.form.calories < 601)
        request += "&calories=%2B" + this.form.calories

      if (this.form.time < 61)
        request += "&time=%2B" + this.form.time

      if (this.form.notContain.length > 0){
        this.form.notContain.forEach(element => {
          if (element != "")
            request += "&excluded=" + element
        })
      }
  
      return request + "&from=" + this.loadCounter + "&to=" + (this.loadCounter + this.load)
    }
  }
}
</script>
