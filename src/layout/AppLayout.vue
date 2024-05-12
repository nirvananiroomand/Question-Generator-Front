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

export default {
  name: 'AppLayout',
  components: {
    DefaultDrawer
  }

}
</script>

<style scoped>

</style>