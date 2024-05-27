import axios from 'axios'

export default {
  namespaced: true,

  state() {
    return {
      isRetrievingChatsHistory: false,
      isGenerating: false,
      chatsHistory: []
    }
  },

  mutations: {
    setIsRetrievingChatsHistory(state, val) {
      state.isRetrievingChatsHistory = val
    },
    setIsGenerating(state, val) {
      state.isGenerating = val
    },
    setChats(state, chats) {
      state.chatsHistory = chats
    },
    addNewChat(state, chat) {
      state.chatsHistory.unshift(chat)
    }
  },

  actions: {
    async getAllChats(context) {
      context.commit('setIsRetrievingChatsHistory', true)
      try {
        const accessToken = context.rootGetters['user/accessToken']
        const response = await axios.get('http://127.0.0.1:8000/conversations/chats/', {
          headers: {
            Authorization: `JWT ${accessToken}`
          }
        })
        context.commit('setIsRetrievingChatsHistory', false)
        context.commit('setChats', response.data.chats)
      } catch (error) {
        context.commit('setIsRetrievingChatsHistory', false)
        console.error('Error fetching chats:', error)
      }
    },
    async createChat(context, payload) {
      context.commit('setIsGenerating', true)
      try {
        const accessToken = context.rootGetters['user/accessToken']
        const response = await axios.post('http://127.0.0.1:8000/conversations/chats/', payload, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${accessToken}`
          }
        })
        context.commit('addNewChat', response.data)
        context.commit('setIsGenerating', false)
        return response.data
      } catch (error) {
        console.error('Error generating questions:', error.message)
        context.commit('setIsGenerating', false)
        throw error
      }
    },
    async getChatDetail(context, id) {
      const accessToken = context.rootGetters['user/accessToken']
      const response = await axios.get(`http://127.0.0.1:8000/conversations/chats/${id}`, {
        headers: {
          Authorization: `JWT ${accessToken}`
        }
      })
      return response.data
    }
  },

  getters: {}
}
