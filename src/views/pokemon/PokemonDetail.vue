<template>
  <div>
    <h2>{{ itemData.name }}</h2>
    <div>
      <b-img v-if="itemData.sprites.front_shiny" rounded="circle" alt="Circle image" :src="itemData.sprites.front_shiny"></b-img>
      <b-img v-else v-bind="mainProps" rounded="circle" alt="Circle image"></b-img>
    </div>

    <b-btn variant="success" @click="$store.commit('PokemonStore/collectData', itemData)">Catch</b-btn>

    <b-row>
      <b-col cols="12" sm="3" md="4">
        Types
        <div v-for="(type, index) in itemData.types" :key="index">
          {{ type.type.name }}
        </div>
      </b-col>
      <b-col cols="12" sm="9" md="8">
        Moves
        <b-row>
          <b-col cols="6" sm="4" md="3" v-for="(move, index) in itemData.moves" :key="index">
            {{ move.move.name }}
          </b-col>
        </b-row>

      </b-col>
    </b-row>

    <div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PokemonDetail',
  data () {
    return {
      mainProps: { blank: true, blankColor: '#777', width: 75, height: 75, class: 'm1' },
      itemData: {
        name: '-',
        types: [],
        moves: [],
        sprites: {
          front_shiny: null,
          back_shiny: null
        }
      }
    }
  },
  computed: {
    ...mapState('PokemonStore', ['pokemonState'])
  },
  watch: {
    'pokemonState.detail' (newVal) {
      this.itemData = { ...newVal }
    }
  },
  created () {
    this.$store.dispatch('PokemonStore/pokemonDetail', { name: this.$route.params.name })
  }
}
</script>
