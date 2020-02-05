<template>
  <div>
    <b-modal
      size="lg"
      :hideFooter="true"
      @hidden="hideToRedirect"
      ref="modalParent">

      <div class="pokemon-detail">
        <div class="d-flex justify-content-center">
          <div v-if="!loading" class="card catch">
            <div class="d-flex justify-content-center">
              <h2>{{ itemData.name }}</h2>
            </div>

            <div class="d-flex justify-content-center">
              <b-img v-if="itemData.sprites.front_shiny" rounded="circle" alt="Circle image" :src="itemData.sprites.front_shiny"></b-img>
              <div v-else class="unknown-pokemon">?</div>
            </div>

            <br>

            <b-btn variant="success" @click="$refs.modal.show()">Catch</b-btn>
          </div>
          <div v-else class="card catch loading">

          </div>
        </div>

        <br>
        <br>
        <span>Details Infomation</span>
        <div role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.accordion-1 variant="info">Types</b-button>
            </b-card-header>
            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>

                <b-row>
                  <b-col cols="12" sm="6" md="6" v-for="(type, index) in itemData.types" :key="index">
                    {{ type.type.name }}
                    <hr />
                  </b-col>
                </b-row>

              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <b-button block href="#" v-b-toggle.accordion-2 variant="info">Moves</b-button>
            </b-card-header>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <b-card-text>
                  <b-row>
                    <b-col cols="6" sm="4" md="3" v-for="(move, index) in itemData.moves" :key="index">
                      {{ move.move.name }}
                      <hr />
                    </b-col>
                  </b-row>
                </b-card-text>
              </b-card-body>
            </b-collapse>
          </b-card>

        </div>

        <div>
          <b-modal
            ref="modal"
            :hideFooter="true"
            :hideHeader="true"
            :noCloseOnBackdrop="true"
            :noCloseOnEsc="true">
            <b-form>
              <b-form-group
              label="Your Pokemon Name"
              label-for="name-input"
              invalid-feedback="Name is required">
                <b-form-input
                  id="name-input"
                  v-model="itemData.pokemon_name"
                  required
                ></b-form-input>
              </b-form-group>
            </b-form>

            <div class="d-flex justify-content-center">
              <b-btn variant="primary" @click="savePokemon">Save</b-btn>
            </div>

          </b-modal>
        </div>
      </div>

    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'PokemonDetail',
  data () {
    return {
      loading: false,
      mainProps: { blank: true, blankColor: '#f0f0f0', width: 75, height: 75, class: 'm1' },
      itemData: {
        pokemon_name: null,
        name: '-',
        types: [],
        moves: [],
        sprites: {
          front_shiny: null,
          back_shiny: null
        }
      }
    }
  },
  computed: {
    ...mapState('PokemonStore', ['pokemonState'])
  },
  watch: {
    'pokemonState.detail' (newVal) {
      this.itemData = { ...newVal, pokemon_name: null }
      this.loading = false
    }
  },
  created () {
    this.$store.dispatch('PokemonStore/pokemonDetail', { name: this.$route.params.name })
    this.loading = true
  },
  mounted () {
    this.$refs.modalParent.show()
  },
  methods: {
    savePokemon () {
      this.$store.commit('PokemonStore/collectData', this.itemData)
      this.$refs.modal.hide()
      this.$router.replace('/pokemon/collection')
    },

    hideToRedirect () {
      this.$router.replace(this.$route.matched[1].path)
    }
  }
}
</script>
