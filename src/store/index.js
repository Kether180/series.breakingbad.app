import { createStore } from 'vuex'

export default createStore({



  // don't update the state directly - upates are always made by committing mutations

  state: {

    initialized: false,
    filterCharacter: true,
    character: [],
    episodes: [],
    character_episodes: [],
    currentCharID: 1,
    currentEpisodeID: 1,
    editCharacter: false,

  },



  // read from the central store

  getters: {

    initialized: state => state.initialized,

    charactersForSelector: state => {
      if (state.filterCharacter) {
        return state.character.filter(char =>
          state.character_episodes.some(item => item.char_id === char.char_id));
      }
      return state.character.filter(char => (char !== null))
    },

    episodes: state => state.episodes,

    currentCharacterID: state => state.currentCharID,
    currentCharacter: state => state.currentCharID ? state.character[state.currentCharID] : {},

    currentEpisodeID: state => state.currentEpisodeID,
    currentEpisode: state => state.currentEpisodeID ? state.episodes[state.currentEpisodeID] : {},

    episodesPerCharacter: state => {
      return state.character_episodes
        .filter(item => item.char_id === state.currentCharID && state.episodes[item.episode_id])
        .map(item => state.episodes[item.episode_id])
    },

    charactersPerEpisode: state => {
      return state.character_episodes
        .filter(item => item.episode_id === state.currentEpisodeID)
        .map(item => {
          return { character: state.character[item.char_id], appearance: true }
        })
        .sort((a, b) => a.character.name < b.character.name ? -1 : 1)

    },

    editCharacterPerEpisode: state => {
      return state.character.filter(char => char !== null)
        .map(char => {
          return {
            character: char,
            appearance: state.character_episodes.some(item => item.episode_id === state.currentEpisodeID && item.char_id === char.char_id)
          }
        })
        .sort((a, b) => {
          if (a.appearance !== b.appearance) {
            return a.appearance ? -1 : 1;
          }
          return a.character.name < b.character.name ? -1 : 1;
        })
    },

    filterCharacter: state => state.filterCharacter,
    editCharacter: state => state.editCharacter,

  },

  // update the store by committing mutations
  mutations: {

    initialized: (state, data) => {
      state.initialized = data;
    },

    

    initCharacter: (state, data) => {
      state.character = data;
    },

    initEpisodes: (state, data) => {
      state.episodes = data;
    },

    initCharacterEpisodes: (state, data) => {
      state.character_episodes = data;
    },



    setCurrentCharacterID: (state, data) => {
      state.currentCharID = data;
    },

    setCurrentEpisodeID: (state, data) => {
      state.currentEpisodeID = data;
    },

    setFilterCharacter: (state, data) => {
      state.filterCharacter = data;
    },

    setEditCharacter: (state, data) => {
      state.editCharacter = data;
    },


    removeCharFromCurrentEpisode: (state, data) => {

      let index = state.character_episodes.findIndex(item => item.char_id === data && item.episode_id === state.currentEpisodeID)
      if (index > -1) {
        state.character_episodes.splice(index, 1);
      }

    },

    addCharToCurrentEpisode: (state, data) => {
      state.character_episodes.push({ char_id: data, episode_id: state.currentEpisodeID })
    },

  },




  // interact with the backend by dispatching actions
  actions: {

    async init({ state, commit }) {

      if (state.initialized) {
        return;
      }

      const tempCharacters = {}; // to temporarily store the names and the ids
      let episodes = []; // // need a new array to correctly set the index to the episode_id value
      const character_episodes = [];


      { // load character data

        const { data, error } = await to(getCharacterList());
        if (error) {
          return;
        }

        const characters = [] // need a new array to correctly set the index to the char_id value
        data.forEach(item => {
          tempCharacters[item.name] = item.char_id; // save name-char_id pairs for later use
          characters[item.char_id] = item;
        })

        commit('initCharacter', characters);

      }

      let filteredEpisodes = []

      { // load episodes data

        const { data, error } = await to(getEpisodeList());
        if (error) {
          return;
        }

        filteredEpisodes = data.filter(episode => {
          return episode.series === "Breaking Bad";
        });

      }

      // create character to episode mapping

      filteredEpisodes.forEach(episode => {

        episodes[episode.episode_id] = episode;

        episode.characters.forEach(name => {

          if (tempCharacters[name]) {

            character_episodes.push(
              {
                char_id: tempCharacters[name],
                episode_id: episode.episode_id
              });

          } else {
            // console.error(name); // the data on the backend needs a bit of quality assurance
          }
        })
      })

      commit('initEpisodes', episodes);

      commit('initCharacterEpisodes', character_episodes);

      commit('initialized', true); // the data for this app is ready for use

    },

  },

  modules: {

  }
})











// ----------- this code is here to simplify combining components by making each component independent -----------------
// In a real app this code should be imported from a single file that is handling all the communication with the backend

const url = "https://www.breakingbadapi.com/api/"

export function getCharacterList() {

  return fetch(url + "characters");

}

export function getEpisodeList() {

  return fetch(url + "episodes");

}


/*
The 'to' function is a helper function that abstracts away the handling of promises. 
It accepts a promise as an argument, i.e. returned from a call to the fetch api 
and 'thens' down into the json and the data content.
*/

function to(promise) {
  return promise.then(response => response.json())
    .then(data => ({ data, error: null }))
    .catch(error => ({ data: null, error }));
}

