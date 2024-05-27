<template>
  <!-- Header Section -->
  <v-app-bar app color="primary" class="px-4">
    <v-toolbar-title>
      <v-skeleton-loader :loading="loading" type="text" color="#2196F3">{{ chat.title }}</v-skeleton-loader>
    </v-toolbar-title>
    <v-spacer/>
  </v-app-bar>

  <v-container fluid>
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="pa-5">
          <v-card-title>Chat Content</v-card-title>
          <v-skeleton-loader :loading="loading" type="list-item-three-line@2">
            <v-card-text>{{ chat.content }}</v-card-text>
          </v-skeleton-loader>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="pa-5">
          <v-card-title>Chat Questions</v-card-title>
          <v-skeleton-loader :loading="loading" type="list-item-two-line@3">
            <v-card-text>
              <v-list dense>
                <v-list-item v-for="question in chat.chat_questions" :key="question.id">
                  <v-list-item-title>{{ question.question_type }}</v-list-item-title>
                  <v-list-item-subtitle>Quantity: {{ question.quantity }}</v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="8">
        <v-card class="pa-5">
          <v-card-title>Generated Response</v-card-title>
          <v-skeleton-loader :loading="loading" type="list-item-three-line">
            <v-card-text>{{ chat.response }}</v-card-text>
          </v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ChatPage',
  data() {
    return {
      chat: {},
      id: null,
      loading: true
    }
  },
  created() {
    this.id = this.$route.params.id // Initialize id when component is created
    this.fetchChatDetails()
  },
  watch: {
    '$route.params.id': function(newId) {
      // Update id when route param changes
      this.id = newId
      this.fetchChatDetails()
    }
  },
  methods: {
    ...mapActions('chat', ["getChatDetail"]),

    async fetchChatDetails() {
      if (this.id) {
        try {
          this.chat = await this.getChatDetail(this.id)
          this.loading = false
        } catch (error) {
          this.loading = false
          console.error('Error fetching chat:', error)
        }
      }
    }
  }
}
</script>

<style>
</style>