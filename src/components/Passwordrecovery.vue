<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Wachtwoord vergeten</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="Password"
                    label="Nieuw wachtwoord"
                    type="password"
                    v-model="credentials.password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="passwordConfirm"
                    prepend-icon="lock"
                    name="Password"
                    label="Wachtwoord bevestigen"
                    v-model="credentials.confirmPassword"
                    type="password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn block @click="submitPassword" color="success">Aanpassen</v-btn>
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
import Axios from 'axios'

export default {
  data() {
    return {
      credentials: {
        password: '',
        confirmPassword: ''
      },
      passwordRules: [
        v => !!v || 'Veld is verplicht'
      ],
      message: '',
      snackbar: false
    }
  },
  mounted() {
    this.$store.commit('SET_LAYOUT', 'simple-layout')
  },
  methods: {
    submitPassword() {
      if (this.credentials.password === this.credentials.confirmPassword) {
        const model = {
          email: this.$route.query.email,
          token: this.$route.query.token,
          password: this.credentials.password
        }

        Axios.post(process.env.ROOT_API + '/accounts/resetpassword', model).then((resp) => {
          if (resp.data.status === 'success') {
            this.message = 'Wachtwoord is succesvol geweizigd!'

            setTimeout(() => {
              this.$router.push('/')
            }, 3500)
          } else if (resp.data.message === 'PasswordTooShort') {
            this.message = 'Wachtwoord voldoet niet aan de gestelde eisen!'
          } else {
            this.message = 'Er is een fout opgetreden!'

            setTimeout(() => {
              this.$router.push('/')
            }, 3500)
          }
          this.snackbar = true
        })
      } else {
        this.message = 'Wachtwoorden komen niet overeen!'
        this.snackbar = true
      }
    }
  },
}
</script>