<template>
  <form class="w-full max-w-2xl px-4 space-y-6 rounded inputs">
    <fieldset :disabled="character === null"> <!-- it can able the from - fieldset-->
      <div class="mb-3">
        <h1 class="text-xl font-bold">Character</h1>
      </div>
      <div class="flex space-x-4">
        <img
          class="object-cover w-48 mr-6 rounded-lg h-72"
          :src="character.img"
          alt="character"
        />
        <div>
          <div class="flex space-x-4">
            <div class="w-1/2">
              <label class="text-gray-600" for="name">Name</label>
              <input
                class="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-teal-400"
                type="text"
                name="name"
                id="name"
                v-model="character.name"
              />
            </div>
            <div class="w-1/2">
              <label class="text-gray-600" for="nickname">Nickname</label>
              <input
                class="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-teal-400"
                type="text"
                name="nickname"
                id="nickname"
                v-model="character.nickname"
              />
            </div>
          </div>
          <div class="flex mt-3 space-x-4">
            <div class="w-1/2">
              <label class="text-gray-600" for="birthday">Birthday</label>
              <input
                class="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-teal-400"
                type="text"
                name="birthday"
                id="birthday"
                v-model="character.birthday"
              />
            </div>
            <div class="w-1/2">
              <label class="text-gray-600" for="portrayed">Portrayed by</label>
              <input
                class="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-teal-400"
                type="text"
                name="portrayed"
                id="portrayed"
                v-model="character.portrayed"
              />
            </div>
              <div class="w-1/2">
              <label class="text-gray-600" for="status">Status</label>
              <input
                class="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-teal-400"
                type="text"
                name="status"
                id="status"
                v-model="character.status"
              />
            </div>
              <div class="w-1/2">
              <label class="text-gray-600" for="appearance">appearance</label>
              <input
                class="w-full px-4 py-2 border border-gray-400 rounded focus:outline-none focus:border-teal-400"
                type="text"
                name="appearance"
                id="appearance"
                v-model="character.appearance"
              />
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  </form>
</template>

<script>
export default {

  name: "CharacterForm",

  computed: {

    character() {
      return this.$store.getters.currentCharacter;
    },
  }

}
</script>
