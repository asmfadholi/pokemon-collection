<template>
  <div>
    <b-row>
      <b-col cols="12" sm="6" md="3" v-for="(pokemon, index) in itemData.results" :key="index">
        <div @click="$router.replace('/pokemon/detail/'+ pokemon.name)">
          {{ pokemon.name }}
        </div>
      </b-col>
    </b-row>
    <div class="d-flex justify-content-center">
      <b-pagination
        v-model="currentPage"
        :total-rows="itemData.count"
        :per-page="20"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PokemonList',
  data () {
    return {
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
    this.pokemonList(0, 20)
  },
  methods: {
    pokemonList (offset, limit) {
      this.$store.dispatch('PokemonStore/pokemonList', { offset, limit })
    }
  }
}
</script>
