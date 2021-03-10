<template>
  <v-app>
    <v-app-bar
    v-if="appbar"
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Groupomania logo"
          contain
          height="40"
          src="/assets/images/icon-left-font-monochrome-white.svg"
          class="ml-n16"
        />
      </div>

      <v-spacer></v-spacer>

      <v-menu rounded transition="scale-transition" origin="top right">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar color="white" size="40">
              <!-- <span class="primary--text">JG</span> -->
              <v-icon color="primary">account_circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item link>
            <v-list-item-title v-text="'Mon compte'"></v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-title v-text="'Se déconnecter'" @click="logout"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <transition name="scale" mode="out-in">
        <router-view/>
      </transition>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    appbar: false,
  }),
  methods: {
    navbar() {
      
      if(this.$route.name == 'Wall') {
        this.appbar = true
      } else {
        this.appbar = false
      }
    },

    logout() {
      localStorage.removeItem('token')
      sessionStorage.removeItem('userId')
      this.$router.replace('/login')
    }
  },
  mounted() {
    this.navbar()
  },

  watch: {
    '$route'() {
      this.navbar()
    }
  }
};
</script>

<style>

  .scale-enter-active, .scale-leave-active {
    transition: 250ms;
  }

  .scale-enter, .scale-leave-to {
    transform: scale(0);
    opacity: 0;
  }
</style>
