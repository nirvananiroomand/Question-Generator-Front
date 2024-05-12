<template>
  <v-navigation-drawer app permanent>
    <template v-slot:prepend>
      <v-list-item>
        <v-list-item-title class="text-blue text-h5">History</v-list-item-title>
      </v-list-item>
      <v-divider/>
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
export default {
  name: 'DefaultDrawer',
  data() {
    return {
      navigationItems: [
        {
          id: 1,
          title: 'First Chat',
          created_at: '2024-05-05T17:00:26.443737Z'
        },
        {
          id: 2,
          title: 'Second Chat',
          created_at: '2024-05-05T17:00:56.794126Z'
        },
        {
          id: 3,
          title: 'Chat number 3',
          created_at: '2024-05-05T17:01:32.860301Z'
        },
        {
          id: 4,
          title: 'title of this chat',
          created_at: '2024-05-07T11:35:31.291781Z'
        },
        {
          id: 5,
          title: 'title of this chat',
          created_at: '2024-05-07T11:37:43.324498Z'
        },
        {
          id: 6,
          title: 'title of this chat',
          created_at: '2024-05-07T11:38:02.834822Z'
        },
        {
          id: 7,
          title: 'title of this chat',
          created_at: '2024-05-07T15:10:30.781825Z'
        },
        {
          id: 8,
          title: 'title of this chat',
          created_at: '2024-05-07T15:18:29.740402Z'
        },
        {
          id: 9,
          title: 'title of this chat',
          created_at: '2024-05-07T15:35:56.173641Z'
        },
        {
          id: 11,
          title: 'First Chat',
          created_at: '2024-05-05T17:00:26.443737Z'
        },
        {
          id: 12,
          title: 'Second Chat',
          created_at: '2024-05-05T17:00:56.794126Z'
        },
        {
          id: 13,
          title: 'Chat number 3',
          created_at: '2024-05-05T17:01:32.860301Z'
        },
        {
          id: 14,
          title: 'title of this chat',
          created_at: '2024-05-07T11:35:31.291781Z'
        },
        {
          id: 15,
          title: 'title of this chat',
          created_at: '2024-05-07T11:37:43.324498Z'
        },
        {
          id: 16,
          title: 'title of this chat',
          created_at: '2024-05-07T11:38:02.834822Z'
        },
        {
          id: 17,
          title: 'title of this chat',
          created_at: '2024-05-07T15:10:30.781825Z'
        },
        {
          id: 18,
          title: 'title of this chat',
          created_at: '2024-05-07T15:18:29.740402Z'
        },
        {
          id: 19,
          title: 'title of this chat',
          created_at: '2024-05-07T15:35:56.173641Z'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>