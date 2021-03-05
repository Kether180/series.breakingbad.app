<template>
  <div class="font-bold text-gray-700">Main Character in:</div>
  <div class="flex flex-wrap gap-1 mt-3">
    <div
      class="m-1 rounded-lg shadow-md w-44"
      :class="episodeID === episode.episode_id ? 'bg-blue-100' : ''"
      @click="episodeSelected(episode.episode_id)"
      v-for="episode in episodes"
      :key="episode.episode_id"
    >
      <div class="p-1 font-bold text-gray-700">
        {{ episode.title }}
      </div>
      <div class="px-1 text-sm text-gray-500">Season: {{ episode.season }}</div>
      <div class="px-1 pb-1 text-sm text-gray-500">
        Episode: {{ episode.episode }}
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: "EpisodesPerCharacter",

  methods: {

    episodeSelected(id) {
      this.$store.commit("setCurrentEpisodeID", id);
    }

  },

  computed: {

    episodes() {

      return this.$store.getters.episodesPerCharacter

    },

    episodeID() {

      return this.$store.getters.currentEpisodeID;

    },

  }

}
</script>