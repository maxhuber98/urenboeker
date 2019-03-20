<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>Instellingen</h1>
      </v-flex>
      <v-flex xs12>
        <v-btn block color="primary" @click="changePassword">Wachtwoord wijzigen</v-btn>

        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-form ref="form" v-model="valid">
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        slot="activator"
                        v-model="password.oldPassword"
                        label="Huidig wachtwoord"
                        prepend-icon="lock"
                        type="password"
                        :rules="passwordRules"
                        required
                      ></v-text-field>
                      <v-text-field
                        slot="activator"
                        v-model="password.newPassword"
                        label="Nieuw wachtwoord"
                        prepend-icon="lock"
                        type="password"
                        :rules="passwordRules"
                        required
                      ></v-text-field>
                      <v-text-field
                        slot="activator"
                        v-model="password.confirmNewPassword"
                        label="Bevestig wachtwoord"
                        prepend-icon="lock"
                        type="password"
                        :rules="passwordRules"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-form>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Sluiten</v-btn>
              <v-btn color="blue darken-1" flat @click.native="save">Opslaan</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex>
        <v-switch v-model="nightSwitch" v-on:change="toggleNightMode" label="Nachtmodus"></v-switch>
      </v-flex>
    </v-layout>

    <v-snackbar :timeout="3500" :bottom="true" v-model="snackbar">{{ message }}</v-snackbar>
  </v-container>
</template>

<script>
import Axios from 'axios'
import { toggleDarkMode, getDarkMode } from '../helpers/general'

export default {
  data() {
    return {
      valid: false,
      dialog: false,
      password: {
        oldPassword: null,
        newPassword: null,
        confirmNewPassword: null
      },
      passwordRules: [
        v => !!v || "Veld mag niet leeg zijn",
      ],
      message: '',
      snackbar: false,
      nightSwitch: false
    }
  },
  mounted() {
    this.$store.commit('SET_LAYOUT', 'app-layout')
    this.nightSwitch = getDarkMode()
  },
  methods: {
    changePassword() {
      this.dialog = true
    },
    close() {
      this.dialog = false
      this.password.oldPassword = null
      this.password.newPassword = null
      this.password.confirmNewPassword = null
    },
    save() {
      if (this.$refs.form.validate()) {
        const model = {
          OldPassword: this.password.oldPassword,
          NewPassword: this.password.newPassword
        }

        Axios.post(process.env.ROOT_API + '/accounts/changepassword', model).then((resp) => {
          console.log(resp.data)
          if (resp.data.status === "success") {
            this.message = 'Wachtwoord is succesvol gewijzigd!'
            this.snackbar = true
            this.dialog = false
            this.$refs.form.reset()
          } else if (resp.data.message === "PasswordMismatch") {
            this.message = 'Huidig wachtwoord is onjuist!'
            this.snackbar = true
          } else {
            this.message = 'Er is een fout opgetreden bij het wijzigen van het wachtwoord!'
            this.snackbar = true
          }
        })
      }
    },
    toggleNightMode() {
      toggleDarkMode()
      window.location.reload()
    }
  }
}
</script>