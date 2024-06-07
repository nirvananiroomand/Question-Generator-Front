<template>
  <v-navigation-drawer app permanent>
    <template v-slot:prepend>
      <v-list-item>
        <v-list-item-title class="text-blue text-h5 font-weight-medium">History</v-list-item-title>
      </v-list-item>
      <v-divider />
    </template>

    <v-skeleton-loader v-if="this.isRetrievingChatsHistory" height="40px" class="mt-3" type="list-item-two-line@8" />
    <v-list v-else>
      <v-list-item v-for="item in this.chatsHistory" :key="item.id" :to="`/chat/${item.id}/`">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-btn block variant="outlined" class="my-3" to="/chat/generate">
        Generate
      </v-btn>
      <v-btn block variant="plain" @click.prevent="logout">
        Logout
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DefaultDrawer',
  mounted() {
    this.getAllChats()
  },
  methods: {
    ...mapActions('chat', ['getAllChats']),
    ...mapActions('user', ['logout'])
  },
  computed: {
    ...mapState('chat', ['isRetrievingChatsHistory', 'chatsHistory'])
  }
}
</script>

<style scoped>

</style>