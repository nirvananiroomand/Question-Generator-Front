<template>
  <v-app>
    <v-container fluid class="signup-container">
      <v-row align="center" justify="center" class="mt-10">
        <v-col cols="12" sm="8" md="6" class="text-center">
          <h1 class="display-2 mb-6">Sign Up</h1>
          <p class="subtitle-1 mb-8">Join us and start generating questions effortlessly!</p>
          <v-form @submit.prevent="handleSignup">
            <v-text-field
              label="Username"
              v-model="username"
              class="text-field"
              outlined
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="email"
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
            <v-text-field
              label="Confirm Password"
              v-model="rePassword"
              type="password"
              class="text-field"
              outlined
              required
            ></v-text-field>
            <v-btn color="primary" large class="mt-8" type="submit" onclick="this.handleSignup()">Sign Up</v-btn>
          </v-form>
          <p class="mt-4">Already have an account? <v-btn text color="#80CBC4" variant="text" to="/login">Log In</v-btn></p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      rePassword: '',
    };
  },
  methods: {
    async handleSignup() {
      console.log('Signup data:', this.username, this.email, this.password, this.rePassword);
      const signupData = {"username": this.username, "password": this.password, "re_password": this.rePassword, "email": this.email}
      const response = await axios.post('http://127.0.0.1:8000/users/signup/', signupData)
      console.log(response.data)
      this.$router.replace('/chat/generate');
      return response.data
    }
  }
}
</script>

<style scoped>
.signup-container {
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

.text-field {
  color: #1565C0;
}
</style>
