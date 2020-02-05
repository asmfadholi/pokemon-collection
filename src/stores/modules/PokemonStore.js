import ApiPokemon from '@/services/ApiPokemon'

export default {
  namespaced: true,

  state: {
    pokemonState: {
      detail: null,
      list: null,
      collections: []
    }
  },

  getters: {

  },

  mutations: {
    storeData (state, payload) {
      state.pokemonState[payload.state] = payload.data
    },

    collectData (state, payload) {
      state.pokemonState.collections.push(payload)
    },

    removeData (state, payload) {
      state.pokemonState.collections.splice(payload, 1)
    }
  },

  actions: {
    async pokemonList ({ commit }, req) {
      try {
        const res = await ApiPokemon.pokemonList(req)
        res.state = 'list'
        commit('storeData', res)
      } catch (e) {
        throw e
      }
    },

    async pokemonDetail ({ commit }, req) {
      try {
        const res = await ApiPokemon.pokemonDetail(req)
        res.state = 'detail'
        commit('storeData', res)
      } catch (e) {
        throw e
      }
    }
  }

}
