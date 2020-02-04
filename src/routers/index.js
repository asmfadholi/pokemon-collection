import Vue from 'vue'
import Router from 'vue-router'
import PokemonRoute from './modules/PokemonRoute'

Vue.use(Router)

const modules = [
  ...PokemonRoute
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '*',
    redirect: '/'
  },
  ...modules
  ]
})