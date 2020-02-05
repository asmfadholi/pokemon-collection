<template>
  <b-container fluid class="pokemon-collection pt-5 mt-5">

    <div class="pokemon-content">
      <b-row v-if="!loading">
        <b-col cols="12" sm="4" md="3" v-for="(pokemon, index) in itemData" :key="index">
          <div class="card">
            <div class="d-flex justify-content-center mb-2">

              <b-img-lazy v-bind="mainProps" v-if="pokemon.sprites.front_shiny !== null" rounded="circle" alt="Circle image" :src="pokemon.sprites.front_shiny"></b-img-lazy>
              <div v-else class="unknown-pokemon">?</div>

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

      <b-row v-else>
        <b-col cols="12" sm="6" md="4" lg="3" v-for="(pokemon, index) in 8" :key="index">
          <div class="card loading">
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
      loading: false,
      mainProps: { blank: true, blankColor: '#f0f0f0', width: 150, height: 150, class: 'm1' },
      itemData: []
    }
  },

  computed: {
    ...mapState('PokemonStore', ['pokemonState'])
  },

  watch: {
    'pokemonState.collections' (newVal) {
      this.itemData = [...this.pokemonState.collections]
      this.doLoading()
    }
  },

  created () {
    this.itemData = [...this.pokemonState.collections]
    this.doLoading()
  },

  methods: {
    doLoading () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 800)
    }
  }

}
</script>
