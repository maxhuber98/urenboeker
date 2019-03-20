<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="Email"
                    label="Email"
                    type="text"
                    v-model="credentials.username"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="Password"
                    label="Wachtwoord"
                    type="password"
                    v-model="credentials.password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <router-link
                  :to="'register'"
                  style="color: white; text-decoration: none"
                  class="mr-1"
                >
                  <v-btn color="primary">Registreren</v-btn>
                </router-link>
                <v-btn color="primary" class="ml-1" @click="login">Inloggen</v-btn>
              </v-card-actions>
              <v-card-actions class="justify-end">
                <router-link :to="'forgotpassword'">Wachtwoord vergeten</router-link>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar :timeout="3500" :bottom="true" v-model="snackbar">
        {{ message }}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  data: () => ({
    drawer: null,
    snackbar: false,
    credentials: {
      username: '',
      password: ''
    },
    message: ''
  }),
  props: {
    source: String
  },
  mounted() {
    this.$store.commit('SET_LAYOUT', 'simple-layout')
  },
  methods: {
    login() {
      this.$store
        .dispatch('authRequest', {
          UserName: this.credentials.username,
          Password: this.credentials.password
        })
        .then(() => {
          this.$router.push('/home')
        })
        .catch(() => {
          if (this.$store.getters.authStatus === "error") {
            this.message = "Inloggegevens zijn onjuist!"
            this.snackbar = true
          }
        })
    }
  }
}
</script>
