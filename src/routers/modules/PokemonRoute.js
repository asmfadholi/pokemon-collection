// import PokemonMain from '@/views/pokemon/PokemonMain'
const PokemonMain = () => import('@/views/pokemon/PokemonMain')
// import PokemonList from '@/views/pokemon/PokemonList'
const PokemonList = () => import('@/views/pokemon/PokemonList')
// import PokemonDetail from '@/views/pokemon/PokemonDetail'
const PokemonDetail = () => import('@/views/pokemon/PokemonDetail')
// import PokemonCollection from '@/views/pokemon/PokemonCollection'
const PokemonCollection = () => import('@/views/pokemon/PokemonCollection')

export default [

  {
    path: '/',
    name: 'Main',
    component: PokemonMain,
    redirect: '/pokemon',
    children: [

      {
        path: '/pokemon',
        name: 'Pokemon List',
        component: PokemonList,
        children: [

          {
            path: '/pokemon/detail/:name',
            name: 'Pokemon Detail',
            component: PokemonDetail
          }

        ]
      },
      {
        path: '/pokemon/collection',
        name: 'Pokemon Collection',
        component: PokemonCollection,
        children: [

          {
            path: '/pokemon/collection/detail/:name',
            name: 'Pokemon Detail Collection',
            component: PokemonDetail
          }

        ]
      }

    ]
  }

]
