<template>
    <main class="favorites">
        <h2>Take a look in favorites recipes</h2>
        <div v-if="favorites.length > 0" class="results">
            <Card v-for="(recipe, index) in favorites" :key="index" :recipe="recipe" @addFavorite="addFavorite" :isFavorite="true">
            </Card>
        </div>
        <div v-else>
            <p>No favorites yet</p>
            <router-link to="/">Try search something</router-link>
        </div>
        
    </main>
</template>

<script>
import Card from "../components/Card.vue"

export default {
    name: "Favorites",
    props:{
        favorites: null
    },
    components: {
        Card
    },
}
</script>

