<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center>
          <v-flex xs12 sm8 md4>
            <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Wachtwoord vergeten</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                    id="email"
                    prepend-icon="person"
                    name="Email"
                    label="E-mail"
                    type="text"
                    v-model="email"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions class="justify-center">
                <v-btn block @click="forgotPassword" color="primary">Versturen</v-btn>
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
      email: '',
      emailRules: [
        v => !!v || 'Veld is verplicht'
      ],
      message: '',
      snackbar: false,
      items: [
        {
          text: 'Login',
          disabled: false,
          href: '#/'
        },
        {
          text: 'Wachtwoord vergeten',
          disabled: true,
          href: 'forgotpassword'
        }
      ]
    }
  },
  mounted() {
    this.$store.commit('SET_LAYOUT', 'simple-layout')
  },
  methods: {
    forgotPassword() {
      if (this.$refs.form.validate()) {
        Axios.post(process.env.ROOT_API + '/accounts/forgotpassword?email=' + this.email).then((resp) => {
          if (resp.data.status === "success") {
            this.message = 'E-mail is succesvol verzonden!'
            this.snackbar = true
            this.$refs.form.reset()

            setTimeout(() => {
              this.$router.push('/')
            }, 3500)
          } else {
            this.message = 'Account kon niet gevonden worden!'
            this.snackbar = true
            this.$refs.form.reset()
          }
        })
      }
    }
  }
}
</script>