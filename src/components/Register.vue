<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Registreren</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    prepend-icon="person"
                    name="Email"
                    label="Email"
                    type="text"
                    v-model="username"
                    :rules="textRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="Password"
                    label="Wachtwoord"
                    type="password"
                    hint="Minimaal 8 karakters, 1 hoofdletter"
                    v-model="password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password2"
                    prepend-icon="lock"
                    name="ConfirmPassword"
                    label="Bevestig wachtwoord"
                    type="password"
                    v-model="confirmpassword"
                    :rules="passwordRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="person"
                    name="Firstname"
                    type="text"
                    label="Voornaam"
                    v-model="firstname"
                    :rules="textRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    prepend-icon="person"
                    name="Lastname"
                    type="text"
                    label="Achternaam"
                    v-model="lastname"
                    :rules="textRules"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="register">Registreren</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar :timeout="3500" :bottom="true" v-model="snackbar">
      {{ text }}
      <v-btn flat color="pink" @click.native="snackbar = false">Sluiten</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    valid: false,
    drawer: null,
    username: '',
    password: '',
    confirmpassword: '',
    firstname: '',
    lastname: '',
    error: null,
    snackbar: false,
    text: '',
    textRules: [
      v => !!v || "Veld mag niet leeg zijn"
    ],
    passwordRules: [
      v => !!v || "Veld mag niet leeg zijn",
      v => v.length >= 6 || "Wachtwoord moet tussen 6 en 12 karakters bevatten"
    ]
  }),
  props: {
    source: String
  },
  mounted() {
    this.$store.commit('SET_LAYOUT', 'simple-layout')
  },
  methods: {
    register() {
      this.error = null
      if (this.$refs.form.validate()) {
        if (this.password === this.confirmpassword) {
          const model = {
            Email: this.username,
            Password: this.password,
            FirstName: this.firstname,
            LastName: this.lastname
          }

          axios
            .post('http://localhost:5000/api/accounts/', model)
            .then((data) => {
              if (data.data.status === 'success') {
                this.snackbar = true
                this.text = 'Account is succesvol aangemaakt!'
                setTimeout(() => {
                  this.$router.push('/')
                }, 3500)
              } else {
                this.snackbar = true
                this.text = 'Er is een fout opgetreden bij het aanmaken van het account.'
              }
            })
        } else {
          this.snackbar = true
          this.text = 'Wachtwoorden zijn niet hetzelfde!'
        }

        this.$refs.form.reset()
      }
    }
  }
}
</script>
