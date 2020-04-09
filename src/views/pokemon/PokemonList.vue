<template>
  <b-container fluid class="pokemon-list pt-5 mt-5">

    <div class="d-flex justify-content-center mt-3">
      <b-pagination
        v-model="currentPage"
        :total-rows="itemData.count"
        :per-page="20"
        v-ga="$ga.commands.trackName.bind(this, 'move page')"
      ></b-pagination>
    </div>

    <div>
      <b-row v-if="!loading">
        <b-col cols="12" sm="6" md="4" lg="3" v-for="(pokemon, index) in itemData.results" :key="index">
          <div class="card" @click="detailPokemon(pokemon)" v-ga="$ga.commands.trackName.bind($parent, 'detail pokemon')">
            <div class="d-flex justify-content-end total-collection">
              <b> {{ totalCollection(pokemon.name) }} </b>
            </div>
            <div class="d-flex justify-content-center">

              <div
                class="box"
                :style="{ backgroundImage: '-moz-radial-gradient(40% 40%, circle, rgba(0, 0, 0, .1) 40%, rgba(0, 0, 0, 1) 100%), -moz-linear-gradient(-90deg, '+ $randomColor({ luminosity: 'dark'}) + '45%, #333 45%, #3f3f3f 50%, #333 55%, #FFF 55%)',
                backgroundImage: '-webkit-radial-gradient(40% 40%, circle, rgba(0, 0, 0, .1) 40%, rgba(0, 0, 0, 1) 100%), -webkit-linear-gradient(-90deg, '+ $randomColor({ luminosity: 'dark'}) + ' 45%, #333 45%, #3f3f3f 50%, #333 55%, #FFF 55%)'}">
              </div>
            </div>

            <h4>
              {{ pokemon.name }}
            </h4>

          </div>
        </b-col>
      </b-row>

      <b-row v-else>
        <b-col cols="12" sm="6" md="4" lg="3" v-for="(pokemon, index) in 20" :key="index">
          <div class="card loading">
          </div>
        </b-col>
      </b-row>
    </div>

    <div class="d-flex justify-content-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="itemData.count"
        :per-page="20"
        v-ga="$ga.commands.trackName.bind(this, 'move page')"
      ></b-pagination>
    </div>

    <router-view/>

  </b-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PokemonList',
  data () {
    return {
      loading: false,
      currentPage: 1,
      itemData: {
        results: [],
        count: 1
      }
    }
  },
  watch: {
    'pokemonState.list' (newVal) {
      this.itemData = { ...newVal }
      this.loading = false
    },
    currentPage (newVal) {
      const offset = (newVal - 1) * 20
      this.pokemonList(offset, 20)
    }
  },
  computed: {
    ...mapState('PokemonStore', ['pokemonState'])
  },
  created () {
    this.loading = true
    this.pokemonList(0, 20)
  },
  methods: {
    pokemonList (offset, limit) {
      this.loading = true
      this.$store.dispatch('PokemonStore/pokemonList', { offset, limit })
    },

    totalCollection (name) {
      const isExist = this.pokemonState.collections.filter((data) => data.name === name)
      return isExist.length
    },

    detailPokemon (pokemon) {
      this.$ga.event({
        eventCategory: 'button',
        eventAction: 'view',
        eventLabel: 'view detail pokemon',
        eventValue: pokemon.name
      })
      this.$router.replace('/pokemon/detail/' + pokemon.name)
    }
  }
}
</script>
