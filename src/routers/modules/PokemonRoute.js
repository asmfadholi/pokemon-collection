import PokemonMain from '@/views/pokemon/PokemonMain'
import PokemonList from '@/views/pokemon/PokemonList'
import PokemonDetail from '@/views/pokemon/PokemonDetail'
import PokemonCollection from '@/views/pokemon/PokemonCollection'

export default [

  {
    path: '/',
    name: 'Main',
    component: PokemonMain,
    redirect: '/pokemon/list',
    children: [

      {
        path: '/pokemon/list',
        name: 'Pokemon List',
        component: PokemonList
      },
      {
        path: '/pokemon/detail/:name',
        name: 'Pokemon Detail',
        component: PokemonDetail
      },
      {
        path: '/pokemon/collection',
        name: 'Pokemon Collection',
        component: PokemonCollection
      }

    ]
  }

]
