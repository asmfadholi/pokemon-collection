import Vue from 'vue'
import Vuex from 'vuex'
import PokemonStore from './modules/PokemonStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    PokemonStore
  }
})
