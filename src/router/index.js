import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Generate from '../views/Generate.vue'
import ChatPage from '@/views/ChatPage.vue'
import AppLayout from '@/layout/AppLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/chat',
      component: AppLayout, // Use AppLayout as the main layout
      children: [
        {
          path: 'generate',
          name: 'Generate',
          component: Generate
        },
        {
          path: ':id',
          name: 'Chat',
          component: ChatPage,
          props: true // Pass route params as props to ChatPage component
        },
      ]
    },
  ]
})

export default router
