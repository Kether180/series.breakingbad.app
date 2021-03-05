<template>
  <div v-if="initialized">
    <div v-if="step > 0" class="m-4">
      <CharacterSelector />
    </div>
    <div v-if="step > 1" class="m-4">
      <CharacterForm />
    </div>

    <div v-if="step > 2" class="m-4">
      <EpisodesPerCharacter />
    </div>

    <div v-if="step > 3" class="m-4 mt-12">
      <EpisodeSelector />
    </div>

    <div v-if="step > 4" class="m-4">
      <EpisodeForm />
    </div>

    <div v-if="step > 5" class="m-4 mt-8">
      <CharacterPerEpisode />
    </div>
  </div>
  <div v-else class="m-8 text-xl">loading data...</div>
</template>

<script>

import CharacterSelector from './components/CharacterSelector.vue'
import CharacterForm from './components/CharacterForm.vue'
import CharacterPerEpisode from './components/CharacterPerEpisode.vue'
import EpisodeSelector from './components/EpisodeSelector.vue'
import EpisodeForm from './components/EpisodeForm.vue'
import EpisodesPerCharacter from './components/EpisodesPerCharacter.vue'

export default {

  components: {
    CharacterSelector,
    CharacterForm,
    CharacterPerEpisode,
    EpisodeSelector,
    EpisodeForm,
    EpisodesPerCharacter,
  },

  created() {
    this.$store.dispatch('init');
  },

  data() {
    return {
      step: 6, // learn this app in 6 steps
    }
  },

  computed: {
    initialized() {
      return this.$store.getters.initialized;
    }
  }

}
</script>
