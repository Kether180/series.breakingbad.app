<template>
  <label for="episodeselect">Choose an Episode:</label>
  <select class="p-1 mx-4 rounded" name="episodeselect" id="episodeselect" v-model="episodeID">
    <option v-for="item in name_ids" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </select>
</template>

<script>
export default {

  name: "EpisodeSelector",

  computed: {

    episodeID: {

      get: function () {
        return this.$store.getters.currentEpisodeID;
      },

      set: function (newValue) {
        this.$store.commit('setCurrentEpisodeID', newValue);
      },

    },
    
    name_ids() {

      return this.$store.getters.episodes
      .filter(item => (item !== null))
      .map(item => ({
        name: item.season + "/" + item.episode + " " + item.title,
        id: item.episode_id
      }))

    },

  }

}
</script>