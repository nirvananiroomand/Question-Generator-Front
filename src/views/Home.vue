<template>
  <v-app>
    <v-container fluid class="container">
      <!-- Hero section -->
      <v-row align="center" justify="center" class="my-10 hero-section">
        <v-col cols="12" sm="10" md="8" class="text-center">
          <h1 class="display-2 mb-6">Welcome to QuesGen </h1>
          <p class="subtitle-1">Effortlessly generate, customize, and track your questions to enhance your learning and productivity.</p>
          <v-btn color="#073979FF" large class="mt-8" to="/chat/generate">Generate Questions</v-btn>
        </v-col>
      </v-row>

      <!-- Features section -->
      <v-row align="center" justify="center" class="my-10">
        <v-col cols="12" sm="10" md="8">
          <h2 class="display-4 mb-6 text-center">Why QuesGen?</h2>
          <v-row justify="center">
            <v-col cols="12" sm="6" md="4" class="text-center">
              <v-icon large color="primary">mdi-pencil</v-icon>
              <h3 class="subtitle-1 mt-4">Easy Question Generation</h3>
              <p class="caption">Generate questions for your chats effortlessly.</p>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="text-center">
              <v-icon large color="primary">mdi-check-circle</v-icon>
              <h3 class="subtitle-1 mt-4">Customize Your Questions</h3>
              <p class="caption">Tailor questions to your specific needs and preferences.</p>
            </v-col>
            <v-col cols="12" sm="6" md="4" class="text-center">
              <v-icon large color="primary">mdi-chart-line</v-icon>
              <h3 class="subtitle-1 mt-4">Track Your Progress</h3>
              <p class="caption">Monitor your performance and progress over time.</p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- Call to action section -->
      <v-row align="center" justify="center" class="my-10 cta-section">
        <v-col cols="12" sm="10" md="8" class="text-center">
          <h2 class="display-4 mb-6">Ready to Get Started?</h2>
          <p class="subtitle-1">Sign up or log in to begin generating customized questions and track your progress.</p>
          <v-btn color="#80CBC4" large class="mt-4" to="/signup">Sign Up</v-btn>
          <v-btn color="secondary" large class="mt-4 ml-4" to="/login">Log In</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style>
.hero-section {
  background-image: linear-gradient(90deg, #03477e, #27c0b1, #042146, #012c56)!important;
  background-size: 400% 400%!important;
  animation: gradient 30s ease infinite;

  padding: 60px 0;
  border-radius: 10px;

}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.display-2 {
  font-weight: 600;
}

.display-4 {
  font-weight: 500;
}

.mb-6 {
  margin-bottom: 3rem;
}

.text-center {
  text-align: center;
}

.caption {
  font-size: 0.9rem;
  color: #6c757d;
}

.cta-section {
  padding: 40px 0;
  border-radius: 10px;
}

.container{
  background-image: linear-gradient(to top, #01132d 0%, #042146 100%);
}
</style>
