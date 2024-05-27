import { createStore } from 'vuex'

import user from './user/index.js'
import chat from './chat/index.js'

const store = createStore({
  modules: {
    user,
    chat
  }
})

export default store