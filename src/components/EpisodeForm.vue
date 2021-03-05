<template>
  <form class="w-full max-w-2xl px-4 space-y-6 rounded inputs">
    <fieldset :disabled="episode === null">
      <div class="mb-3">
        <h1 class="text-xl font-bold">Episode</h1>
      </div>
      <div class="flex space-x-4">
        <div class="w-1/2">
          <label class="text-gray-600" for="name">Title</label>
          <input
            class="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-teal-400"
            type="text"
            name="title"
            id="title"
            v-model="episode.title"
          />
        </div>
        <div class="w-1/2">
          <label class="text-gray-600" for="season">Season</label>
          <input
            class="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-teal-400"
            type="text"
            name="season"
            id="season"
            v-model="episode.season"
          />
        </div>
      </div>
      <div class="flex mt-3 space-x-4">
        <div class="w-1/2">
          <label class="text-gray-600" for="episode">Episode</label>
          <input
            class="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-teal-400"
            type="text"
            name="episode"
            id="episode"
            v-model="episode.episode"
          />
        </div>
        <div class="w-1/2">
          <label class="text-gray-600" for="air_date">Air Date</label>
          <input
            class="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-teal-400"
            type="text"
            name="air_date"
            id="air_date"
            v-model="episode.air_date"
          />
        </div>
      </div>
      <div class="flex mt-3 space-x-">
        <label
          >Edit Character Appearance
          <input class="mx-3" type="checkbox" v-model="editCharacter" />
        </label>
      </div>
    </fieldset>
  </form>
</template>

<script>
export default {

  name: "EpisodeForm",

  computed: {

    episode() {

      return this.$store.getters.currentEpisode;

    },

    editCharacter: {

      get: function () {
        return this.$store.getters.editCharacter;
      },

      set: function (newValue) {
        this.$store.commit('setEditCharacter', newValue);
      },

    },
  }

}
</script>
