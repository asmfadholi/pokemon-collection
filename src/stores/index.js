import Vue from 'vue'
import Vuex from 'vuex'
import PokemonStore from '@/stores/modules/PokemonStore'

// const PokemonStore = () => import('@/stores/modules/PokemonStore')
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'

let ls = new SecureLS({ isCompression: true })

Vue.use(Vuex)

let store = new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })
  ]
})

store.registerModule('PokemonStore', PokemonStore)

export default store
