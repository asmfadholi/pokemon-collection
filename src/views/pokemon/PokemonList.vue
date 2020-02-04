<template>
  <div>
    This is List of Pokemon
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PokemonList',
  computed: {
    ...mapState('PokemonStore', ['pokemonState'])
  }
}
</script>
