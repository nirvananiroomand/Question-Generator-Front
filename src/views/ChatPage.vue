<template>
  <div class="chat-container">
    <!-- Header Section -->
    <v-app-bar app color="primary">
      <v-toolbar-title>{{ chat.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- Add back button or any other necessary controls here -->
    </v-app-bar>

    <!-- Content Section -->
    <v-container fluid>
      <v-row>
        <!-- Left side - Chat Content -->
        <v-col cols="12" md="8">
          <v-card class="chat-content">
            <v-card-title>Chat Content</v-card-title>
            <v-card-text>{{ chat.content }}</v-card-text>
          </v-card>
        </v-col>

        <!-- Right side - Chat Questions -->
        <v-col cols="12" md="4">
          <v-card class="chat-questions">
            <v-card-title>Chat Questions</v-card-title>
            <v-card-text>
              <v-list dense>
                <v-list-item v-for="question in chat.chat_questions" :key="question.id">
                  <v-list-item-content>
                    <v-list-item-title>{{ question.question_type }}</v-list-item-title>
                    <v-list-item-subtitle>Quantity: {{ question.quantity }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Generated Response Section -->
      <v-row>
        <v-col cols="12" md="8">
          <v-card class="generated-response">
            <v-card-title>Generated Response</v-card-title>
            <v-card-text>{{ chat.response }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChatPage',
  data() {
    return {
      chat: {},
      id: null,
    };
  },
  created() {
    this.id = this.$route.params.id; // Initialize id when component is created
    this.fetchChatDetails(); // Fetch chat details immediately
  },
  watch: {
    '$route.params.id': function(newId) {
      // Update id when route param changes
      this.id = newId;
      this.fetchChatDetails(); // Fetch chat details when id changes
    }
  },
  methods: {
    async fetchChatDetails() {
      if (this.id) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/conversations/chats/${this.id}`);
          this.chat = response.data;
        } catch (error) {
          console.error('Error fetching chat:', error);
        }
      }
    }
  }
};

//////////////////APPROACH THREE/////////////////////////////////////
// export default {
//   name: 'ChatPage',
//   data() {
//     return {
//       chat: {},
//       id: null,
//     };
//   },
//   async created() {
//     await this.fetchChatDetails();
//   },
//   methods: {
//     async fetchChatDetails() {
//       // Extract chat ID from URL and assign it to id
//       this.id = this.$route.params.id;
//       if (this.id) {
//         try {
//           const response = await axios.get(`http://127.0.0.1:8000/conversations/chats/${this.id}`);
//           this.chat = response.data;
//         } catch (error) {
//           console.error('Error fetching chat:', error);
//         }
//       }
//     }
//   },
//   beforeRouteEnter(to, from, next) {
//     next(vm => {
//       vm.id = to.params.id;
//       vm.fetchChatDetails();
//     });
//   },
//   beforeRouteUpdate(to, from, next) {
//     this.id = to.params.id;
//     this.fetchChatDetails();
//     next();
//   }
// };


///////////////////APPROACH TWO////////////////////////////////
// export default {
//   name: 'ChatPage',
//   data(){
//     return {
//       chat: {},
//       id: null, // Remove hard-coded ID
//     }
//   },
//   async created() {
//     console.log('ChatPage created') // Add this line for debugging
//     await this.fetchChatDetails()
//   },
//   async mounted() {
//     console.log('ChatPage mounted') // Add this line for debugging
//   },
//   async beforeRouteUpdate(to, from, next) {
//     // Extract chat ID from the new route and update the component
//     this.id = to.params.id
//     await this.fetchChatDetails()
//     next()
//   },
//   methods: {
//     async fetchChatDetails() {
//       // Reset chat object to empty only when transitioning to a new chat page
//       if (this.id !== this.$route.params.id) {
//         this.chat = {}
//       }
//       if (this.id) {
//         try {
//           const response = await axios.get(`http://127.0.0.1:8000/conversations/chats/${this.id}`)
//           this.chat = response.data // Assign fetched chat data to chat variable
//           console.log('Fetched chat details:', this.chat)
//         } catch (error) {
//           console.error('Error fetching chats:', error)
//         }
//       }
//     }
//   }
// }


//////////////////////////////APPROACH ONE////////////////////////////////////////
//   watch: {
//     // Watch for changes to the id property
//     id: {
//       immediate: true, // Trigger watcher immediately when component is created
//       deep: true, // Ensure changes to nested properties are detected
//       handler(newValue, oldValue) {
//         // Fetch chat details whenever the id changes
//         if (newValue !== oldValue) {
//           if (this.id){
//             this.fetchChatDetails()
//           }
//         }
//       }
//     }
//   },
//   mounted() {
//     // Extract chat ID from URL and assign it to id
//     console.log("in mounted")
//     this.id = this.$route.params.id
//     console.log(this.id)
//   },
//   methods: {
//     async fetchChatDetails(){
//       console.log("in fetchChatDetails")
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/conversations/chats/${this.id}`)
//         this.chat = response.data // Assign fetched chat data to chat variable
//         console.log(this.chat)
//       }
//       catch (error) {
//         console.error('Error fetching chats:', error)
//       }
//     }
//   }
// }
</script>

<style>
.chat-container {
  padding: 20px;
}

.chat-content,
.chat-questions,
.generated-response {
  padding: 20px;
}
</style>