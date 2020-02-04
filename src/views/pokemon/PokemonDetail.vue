<template>
  <div>
    This is Detail of Pokemon
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PokemonDetail',
  computed: {
    ...mapState('PokemonStore', ['pokemonState'])
  }
}
</script>
