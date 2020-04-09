// import Api from './Api'

export default {
  pokemonList (req) {
    const api = this.generateApi()
    return api.get('pokemon?offset=' + req.offset + '&limit=' + req.limit).then(res => res)
  },

  pokemonDetail (req) {
    const api = this.generateApi()
    return api.get('pokemon/' + req.name).then(res => res)
  }
}
