<template>
    <transition name="bounce">
        <div class="card" :style="'background-image : url(' + recipe.recipe.image + ')'">
            <div class="card-header">
            <span>{{recipe.recipe.label}}</span>
            <button v-if="!isFavorite" :class="{favorited: recipe.bookmarked}" v-on:click="recipe.bookmarked = true; $emit('addFavorite', recipe)">&#9733;</button>
            </div>
            <a v-on:click="open(recipe.recipe.url)" style="cursor:pointer;display: block;width: 100%;height: 85%;"></a>
        </div>    
    </transition>
</template>

<script>
export default {
    name: "Card",
    props:{
        isFavorite: false,
        recipe: null
    },
    methods: {
        open: function (url){
            window.open(url, '_blank')
        },
    }
}
</script>

