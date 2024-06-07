import { apiCall } from '@/services/api_call.js'

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
        const response = await apiCall(context, {
          method: 'get',
          url: 'http://127.0.0.1:8000/conversations/chats/'
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
        const response = await apiCall(context, {
          method: 'post',
          url: 'http://127.0.0.1:8000/conversations/chats/',
          data: payload
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
      try {
        const response = await apiCall(context, {
          method: 'get',
          url: `http://127.0.0.1:8000/conversations/chats/${id}`
        })
        return response.data
      } catch (error) {
        console.error('Error fetching chat detail:', error)
        throw error
      }
    }
  },

  getters: {}
}