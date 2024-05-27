<template>
  <v-app>
    <DefaultDrawer/>

    <v-main>
      <!-- Main content of pages goes here -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import DefaultDrawer from '@/components/DefaultDrawer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'AppLayout',
  components: {
    DefaultDrawer
  },
  created() {
    if (!this.isAuthenticated) {
      this.$router.replace('/login')
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated'])
  }
}
</script>

<style scoped>

</style>