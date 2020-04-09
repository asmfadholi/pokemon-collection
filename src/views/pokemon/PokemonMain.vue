<template>
  <div>
    <div id="nav" class="fixed-top mb-5">
      <router-link to="/pokemon" v-ga="'redirect page to home'">Find Pokemon</router-link> |
      <router-link to="/pokemon/collection" v-ga="'redirect page to collection'">My Collections</router-link>
    </div>

    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view class="mt-5">
        </router-view>
      </keep-alive>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'PokemonMain'
}
</script>
