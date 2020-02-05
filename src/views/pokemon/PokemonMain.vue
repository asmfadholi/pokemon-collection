<template>
  <div>
    <div id="nav" class="fixed-top mb-5">
      <router-link to="/pokemon">Find Pokemon</router-link> |
      <router-link to="/pokemon/collection">My Collections</router-link>
    </div>

    <transition name="fade" mode="out-in">
      <router-view class="mt-5">
      </router-view>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'PokemonMain'
}
</script>
