import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Generate from '../views/Generate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/generate',
      name: 'Generate',
      component: Generate
    },
  ]
})

export default router
