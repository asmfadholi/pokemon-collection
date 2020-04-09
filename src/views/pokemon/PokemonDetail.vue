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
              <b-img-lazy v-bind="mainProps" v-if="itemData.sprites.front_shiny" rounded="circle" alt="Circle image" :src="itemData.sprites.front_shiny"></b-img-lazy>
              <div v-else class="unknown-pokemon">?</div>
            </div>

            <br>

            <b-btn variant="success" @click="catchPokemon" v-ga="$ga.commands.trackName.bind(this, 'catch pokemon')" >Catch</b-btn>
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
              <b-button block href="#" v-b-toggle.accordion-1 variant="info" v-ga="$ga.commands.trackName.bind(this, 'open types pokemon')">Types</b-button>
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
              <b-button block href="#" v-b-toggle.accordion-2 variant="info" v-ga="$ga.commands.trackName.bind(this, 'open move pokemon')" >Moves</b-button>
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

            <b>
              {{ possibility === 'info' ? 'Capturing pokemon....' : (possibility === 'success' ? 'Congraturation !!!' : 'Failed, pokemon dissapeared') }}
            </b>

            <b-progress class="mt-2" :max="max" show-value>
              <b-progress-bar :value="value" :variant="possibility"></b-progress-bar>
            </b-progress>

            <br>

            <div>
              <b-form v-if="possibility === 'success'">
                <b-form-group
                label="You got new Pokemon"
                label-for="name-input"
                invalid-feedback="Name is required">
                  <b-form-input
                    id="name-input"
                    placeholder="Enter your pokemon's name"
                    v-model="itemData.pokemon_name"
                    required
                  ></b-form-input>
                </b-form-group>
              </b-form>

              <div class="d-flex justify-content-center">
                <b-btn variant="primary" @click="savePokemon" v-if="possibility === 'success'" v-ga="$ga.commands.trackName.bind(this, 'save pokemon')" >Save</b-btn>
                <b-btn variant="danger" @click="hideToRedirect" v-else-if="possibility === 'danger'" v-ga="$ga.commands.trackName.bind(this, 'failed catch')" >Back</b-btn>
              </div>
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
      max: 100,
      value: 10,
      possibility: 'info',
      loading: false,
      mainProps: { blank: true, blankColor: '#f0f0f0', width: 150, height: 150, class: 'm1' },
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
  mounted () {
    this.$refs.modalParent.show()
    this.$store.dispatch('PokemonStore/pokemonDetail', { name: this.$route.params.name })
    this.loading = true
  },
  methods: {
    savePokemon () {
      const data = {
        name: this.itemData.name,
        pokemon_name: this.itemData.pokemon_name,
        sprites: this.itemData.sprites
      }

      this.$swal({
        title: 'Congratulation !!!',
        text: 'Pokemon ' + this.itemData.pokemon_name + ' have been added to your collection',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'Ok'
      })

      this.$store.commit('PokemonStore/collectData', data)
      this.$refs.modal.hide()
      this.$router.replace(this.$route.matched[1].path)
    },

    hideToRedirect () {
      this.$router.replace(this.$route.matched[1].path)
    },

    checkProbability () {
      if (Math.random() < 0.5) {
        this.possibility = 'success'
      } else {
        this.possibility = 'danger'
      }
    },

    catchPokemon () {
      this.$refs.modal.show()
      this.possibility = 'info'
      this.value = 0
      const intervalProgress = setInterval(() => {
        this.value += 10
        if (this.value === 100) {
          clearInterval(intervalProgress)
          this.checkProbability()
          this.$ga.event('send', 'event', {
            eventCategory: 'button',
            eventAction: 'catch',
            eventLabel: 'catch ' + this.itemData.name
          })
        }
      }, 500)
    }
  }
}
</script>
