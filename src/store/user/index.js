import { apiCall } from '@/services/api_call.js'

export default {
  namespaced: true,

  state() {
    return {
      user: null,
      tokens: null
    }
  },

  mutations: {
    initializeState(state) {
      state.user = JSON.parse(localStorage.getItem('user'))
      state.tokens = JSON.parse(localStorage.getItem('tokens'))
    },
    setUser(state, user) {
      localStorage.setItem('user', JSON.stringify(user))
      state.user = user
    },
    setTokens(state, tokens) {
      localStorage.setItem('tokens', JSON.stringify(tokens))
      state.tokens = tokens
    }
  },

  actions: {
    async signup(context, payload) {
      const response = await apiCall(context, {
        method: 'post',
        url: 'http://127.0.0.1:8000/users/signup/',
        data: payload,
        authRequired: false
      })
      context.commit('setUser', response.data)
      context.commit('setTokens', response.data.tokens)
      return response.data
    },
    async login(context, payload) {
      const response = await apiCall(context, {
        method: 'post',
        url: 'http://127.0.0.1:8000/users/login/',
        data: payload,
        authRequired: false
      })
      context.commit('setUser', response.data)
      context.commit('setTokens', response.data.tokens)
      return response.data
    },
    async refreshToken(context) {
      const refreshToken = context.getters.refreshToken
      const response = await apiCall(context, {
        method: 'post',
        url: 'http://127.0.0.1:8000/users/token/refresh/',
        data: { refresh: refreshToken },
        authRequired: false
      })
      context.commit('setTokens', response.data)
      return response
    }
  },

  getters: {
    isAuthenticated(state) {
      return state.tokens != null
    },
    accessToken(state) {
      return state.tokens ? state.tokens.access : null
    },
    refreshToken(state) {
      return state.tokens ? state.tokens.refresh : null
    },
    userId(state) {
      return state.user ? state.user.id : null
    }
  }
}
