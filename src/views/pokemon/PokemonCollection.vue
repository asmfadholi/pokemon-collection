<template>
  <div>
    This is Collection of Pokemon

    <router-view/>
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
