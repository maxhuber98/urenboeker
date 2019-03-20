<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
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
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    name="Password"
                    label="Wachtwoord"
                    type="password"
                    hint="Minimaal 6 karakters"
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
                <v-layout>
                  <v-flex x5>
                    <router-link
                      block
                      :to="'/'"
                      class="pl-0"
                      style="color: white; text-decoration: none"
                    >
                      <v-btn block color="primary">Inloggen</v-btn>
                    </router-link>
                  </v-flex>
                  <v-spacer></v-spacer>
                  <v-flex xs5 class="mr-2">
                    <v-btn block color="success" class="mr-1" @click="register">Registreren</v-btn>
                  </v-flex>
                </v-layout>
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
    emailRules: [
      v => !!v || 'E-mail is verplicht',
      v => /.+@.+/.test(v) || 'Geen geldig E-mail ingevuld'
    ],
    textRules: [
      v => !!v || "Veld mag niet leeg zijn"
    ],
    passwordRules: [
      v => !!v || "Veld mag niet leeg zijn",
      v => v.length >= 6 || "Wachtwoord moet tenminste 6 karakters bevatten"
    ],
    items: [
      {
        text: 'Login',
        disabled: false,
        href: '#/'
      },
      {
        text: 'Registreren',
        disabled: true,
        href: '#/register'
      }
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
            .post(process.env.ROOT_API + '/accounts/', model)
            .then((data) => {
              if (data.data.status === 'success') {
                this.snackbar = true
                this.text = 'Account is succesvol aangemaakt!'
                setTimeout(() => {
                  this.$router.push('/')
                }, 3500)
              } else {
                this.snackbar = true

                if (data.data.message === 'DuplicateUserName')
                  this.text = 'Dit e-mailadres is al geregistreerd!'
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
