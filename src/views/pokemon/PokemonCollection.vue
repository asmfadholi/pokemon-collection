<template>
  <b-container fluid class="pokemon-collection">

    <div class="pokemon-content">
      <b-row>
        <b-col cols="12" sm="4" md="3" v-for="(pokemon, index) in itemData" :key="index">
          <div class="card">
            <div class="d-flex justify-content-center">
              <b-img-lazy v-bind="mainProps" v-if="pokemon.sprites.front_shiny !== null" rounded="circle" alt="Circle image" :src="pokemon.sprites.front_shiny"></b-img-lazy>
              <b-img v-else v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
            </div>
            <h3>
              {{ pokemon.pokemon_name }}
            </h3>
            <p>
              {{ pokemon.name }}
            </p>

            <b-btn variant="info" @click="$router.replace('/pokemon/collection/detail/'+pokemon.name)">Details</b-btn>

          </div>
        </b-col>
      </b-row>
    </div>

    <router-view/>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PokemonCollection',
  data () {
    return {
      mainProps: { blank: true, blankColor: '#A9A9A9', width: 150, height: 150, class: 'm1' },
      itemData: []
    }
  },
  computed: {
    ...mapState('PokemonStore', ['pokemonState'])
  },
  watch: {
    'pokemonState.collections' (newVal) {
      this.itemData = [...this.pokemonState.collections]
    }
  },
  created () {
    this.itemData = [...this.pokemonState.collections]
  }
}
</script>
