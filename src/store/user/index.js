import axios from "axios";

export default {
  namespaced: true,

  state() {
    return {
      user: null,
      tokens: null
    }
  },

  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setTokens(state, tokens) {
      state.tokens = tokens
    }
  },

  actions: {
    async signup(context, payload) {
      const response = await axios.post('http://127.0.0.1:8000/users/signup/', payload)
      context.commit('setUser', response.data)
      context.commit('setTokens', response.data.tokens)
      return response.data
    },
    async login(context, payload) {
      const response = await axios.post('http://127.0.0.1:8000/users/login/', payload)
      context.commit('setUser', response.data)
      context.commit('setTokens', response.data.tokens)
      return response.data
    }
  },

  getters: {}
}
