<template>
  <v-app>
    <v-container fluid class="login-container">
      <v-row align="center" justify="center" class="mt-10">
        <v-col cols="12" sm="8" md="6" class="text-center">
          <h1 class="display-2 mb-6">Log In</h1>
          <p class="subtitle-1 mb-8">Welcome back! Please login to continue.</p>
          <v-form @submit.prevent="handleLogin">
            <v-text-field
              label="Username"
              v-model="username"
              class="text-field"
              outlined
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              class="text-field"
              outlined
              required
            ></v-text-field>
            <v-btn color="#80CBC4" large class="mt-8" type="submit">Log In</v-btn>
          </v-form>
          <p class="mt-4">Don't have an account? <v-btn color="primary" variant="text" to="/signup">Sign Up</v-btn></p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('user', ['login']),

    async handleLogin() {
      const loginData = {"username": this.username, "password": this.password}
      try{
        await this.login(loginData)
        this.$router.replace('/chat/generate');
      }
      catch (e) {
        console.log('error in login request', e)
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  color: white;
  min-height: 100vh;
  padding: 60px 0;
}

.display-2 {
  font-weight: 600;
}

.subtitle-1 {
  color: #cfd8dc;
}

.mt-10 {
  margin-top: 60px;
}

.mb-6 {
  margin-bottom: 3rem;
}

.mb-8 {
  margin-bottom: 4rem;
}

.text-field{
  color: #00ACC1;
}
</style>

