<template>
  <label for="characterselect">Choose a Character:</label>
  <select
    class="p-1 mx-4 rounded"
    name="characterselect"
    id="characterselect"
    v-model="characterID"
  >
    <option v-for="item in name_ids" :key="item.charid" :value="item.charid">
      {{ item.name }}
    </option>
  </select>
  <label
    >Filter Main Appearance
    <input class="mx-3" type="checkbox" v-model="filterMainCharacter" />
  </label>
</template>

<script>
export default {

  name: "CharacterSelector",

  computed: {

    filterMainCharacter: {

      get: function () {
        return this.$store.getters.filterCharacter;
      },

      set: function (newValue) {
        this.$store.commit('setFilterCharacter', newValue);
      },

    },

    characterID: {

      get: function () {
        return this.$store.getters.currentCharacterID;
      },

      set: function (newValue) {
        this.$store.commit('setCurrentCharacterID', newValue);
      },

    },

    name_ids() {

      return this.$store.getters.charactersForSelector
        .map(item => ({ name: item.name, charid: item.char_id }))
        .sort((a, b) => a.name < b.name ? -1 : 1);

    },

  }

}
</script>