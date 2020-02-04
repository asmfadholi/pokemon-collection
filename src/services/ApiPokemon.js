import Api from './Api'

export default {
  pokemonList (req) {
    const api = Api.generateApi()
    return api.get('pokemon?offset=' + req.offset + '&' + req.limit).then(res => res)
  },

  pokemonDetail (req) {
    const api = Api.generateApi()
    return api.get('pokemon/' + req.name).then(res => res)
  }
}
