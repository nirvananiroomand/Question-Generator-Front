<template>
  <v-app>
    <v-container fluid class="signup-container">
      <v-row align="center" justify="center" class="mt-10">
        <v-col cols="12" sm="8" md="6" class="text-center">
          <h1 class="display-2 mb-6">Sign Up</h1>
          <p class="subtitle-1 mb-8">Join us and start generating questions effortlessly!</p>
          <v-form ref="form" @submit.prevent="handleSignup" v-model="valid">
            <v-text-field
              label="Username"
              v-model="username"
              class="text-field"
              :rules="usernameRules"
              outlined
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="email"
              class="text-field"
              :rules="emailRules"
              outlined
              required
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              type="password"
              class="text-field"
              :rules="passwordRules"
              outlined
              required
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              v-model="rePassword"
              type="password"
              class="text-field"
              :rules="confirmPasswordRules"
              outlined
              required
            ></v-text-field>
            <v-btn color="primary" large class="mt-8" type="submit" :disabled="isBtnDisabled">
              {{ isLoading ? 'Loading...' : 'Sign Up'}}
            </v-btn>
          </v-form>
          <p class="mt-4">Already have an account? <v-btn color="#80CBC4" variant="text" to="/login">Log In</v-btn></p>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SignupPage',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      rePassword: '',
      isLoading: false,
      valid: false,
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 4 && /^[\w.@+-]+$/.test(v)) || 'Username is required, must be at least 4 characters. It must contain letters, digits and @/./+/-/_ only.'
      ],
      emailRules: [
        v => !v || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v) || 'Email must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8 && v.length <= 128) || 'Password must be at least 6 characters'
      ],
      confirmPasswordRules: [
        v => !!v || 'Confirm password is required',
        v => v === this.password || 'Passwords must match'
      ]
    };
  },
  methods: {
    ...mapActions('user', ['signup']),

    async handleSignup() {
      if (this.$refs.form.validate()) {
        const signupData = {
          "username": this.username,
          "password": this.password,
          "re_password": this.rePassword,
          "email": this.email
        }
        try {
          this.isLoading = true
          await this.signup(signupData)
          this.isLoading = false
          this.$router.replace('/chat/generate')
        } catch (e) {
          this.isLoading = false
          //TODO: add snackbar
          console.log('error in signup request', e)
        }
      }
    }
  },
  computed: {
    isBtnDisabled(){
      return !this.valid || this.isLoading
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
