<template>
  <div>
    This is Collection of Pokemon
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PokemonCollection',
  computed: {
    ...mapState('PokemonStore', ['pokemonState'])
  }
}
</script>
