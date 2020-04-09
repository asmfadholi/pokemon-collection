import Api from '@/services'

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
      if (payload.state === 'detail') {
        const moves = payload.data.moves.map(d => {
          return {
            move: {
              name: d.move.name
            }
          }
        })
        const data = {
          name: payload.data.name,
          types: payload.data.types,
          sprites: payload.data.sprites,
          moves
        }
        state.pokemonState[payload.state] = data
      } else {
        state.pokemonState[payload.state] = payload.data
      }
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
        const res = await Api.pokemonList(req)
        res.state = 'list'
        commit('storeData', res)
      } catch (e) {
        throw e
      }
    },

    async pokemonDetail ({ commit }, req) {
      try {
        const res = await Api.pokemonDetail(req)
        res.state = 'detail'
        commit('storeData', res)
      } catch (e) {
        throw e
      }
    }
  }

}
