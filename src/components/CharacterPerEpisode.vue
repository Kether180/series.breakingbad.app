<template>
  <div class="font-bold text-gray-700">Characters:</div>
  <div class="flex flex-row flex-wrap gap-1 mt-3">
    <div :class="characterID === item.character.char_id ? 'bg-blue-100' : ''"
      class="m-1 rounded-lg shadow-md w-44"
      @click="characterSelected(item.character.char_id)"
      v-for="item in list"
      :key="item.character.char_id"
    >
      <div class="text-center">
        <img
          class="object-cover m-auto mt-4 rounded-lg h-44 w-36"
          :src="item.character.img"
          alt="character"
        />
        <div class="p-1 font-bold text-gray-700">
          {{ item.character.name }}
        </div>
        <div v-if="editCharacter">
          <button
            @click.stop="toggleCharacter(item)"
            class="px-4 py-1 m-2 font-bold text-white"
            :class="
              item.appearance
                ? 'bg-red-500 rounded hover:bg-red-700'
                : 'bg-green-500 rounded hover:bg-green-700'
            "
          >
            {{ item.appearance ? "remove" : "add to episode" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: "CharacterPerEpisode",

  methods: {

    characterSelected(id) {
      this.$store.commit("setCurrentCharacterID", id);
    },

    toggleCharacter(item) {

      // console.log("toggleCharacter", item.character.char_id, item.appearance)
      if (item.appearance) {
        this.$store.commit("removeCharFromCurrentEpisode", item.character.char_id);
      } else {
        this.$store.commit("addCharToCurrentEpisode", item.character.char_id);
      }
    }

  },

  computed: {

    editCharacter() {
      return this.$store.getters.editCharacter;
    },

    characterID() {
      return this.$store.getters.currentCharacterID;
    },

    list() {
      if (this.editCharacter) {
        return this.$store.getters.editCharacterPerEpisode
      }
      return this.$store.getters.charactersPerEpisode;
    },

  }

}
</script>