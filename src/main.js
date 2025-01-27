import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index.js'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark"
  },
  components,
  directives,
})

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(store)

store.commit('user/initializeState')

app.mount('#app')

