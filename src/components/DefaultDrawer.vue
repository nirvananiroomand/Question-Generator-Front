<template>
  <v-navigation-drawer app permanent>
    <template v-slot:prepend>
      <v-list-item>
        <v-list-item-title class="text-blue text-h5">History</v-list-item-title>
      </v-list-item>
      <v-divider />
    </template>

    <v-list>
      <v-list-item v-for="item in navigationItems" :key="item.id" :to="`/chat/${item.id}/`">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <router-link class="pa-2" to="/chat/generate">
        <v-btn block>
          Generate
        </v-btn>
      </router-link>
    </template>
  </v-navigation-drawer>
</template>

<script>
import axios from 'axios'
export default {
  name: 'DefaultDrawer',
  data() {
    return {
      navigationItems: []
    }
  },
  mounted() {
    this.fetchChatsData()
  },
  methods: {
    async fetchChatsData() {
      console.log("in fetch chats data")
      try {
        const response = await axios.get('http://127.0.0.1:8000/conversations/chats/')
        this.navigationItems = response.data.chats
        console.log(this.navigationItems)
      } catch (error) {
        console.error('Error fetching chats:', error)
      }
    }
  }
}
</script>

<style scoped>

</style>