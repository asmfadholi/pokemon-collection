<template>
  <div>

    <div>
      <b-row>
        <b-col cols="12" sm="6" md="3" v-for="(pokemon, index) in itemData" :key="index">
          <div>
            <div class="d-flex justify-content-center">
              <b-img v-if="pokemon.sprites.front_shiny" rounded="circle" alt="Circle image" :src="pokemon.sprites.front_shiny"></b-img>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PokemonCollection',
  data () {
    return {
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
