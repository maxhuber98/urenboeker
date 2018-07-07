<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="Email" label="Email" type="text" v-model="username" required></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="Password" label="Password" type="password" v-model="password" required></v-text-field>
                  <v-text-field id="password2" prepend-icon="lock" name="ConfirmPassword" label="Confirm Password" type="password" v-model="confirmpassword" required></v-text-field>
                  <v-text-field prepend-icon="person" name="Firstname" type="text" label="Firstname" v-model="firstname" required=""></v-text-field>
                  <v-text-field prepend-icon="person" name="Lastname" type="text" label="Lastname" v-model="lastname" required=""></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success" @click="register">Register</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-snackbar
          :timeout="3500"
          :bottom="true"
          v-model="snackbar"
        >
          {{ text }}
          <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
	data: () => ({
		drawer: null,
		username: '',
		password: '',
		confirmpassword: '',
		firstname: '',
		lastname: '',
		error: null,
		snackbar: false,
		text: ''
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
							this.text = 'Successfully created account!'
							setTimeout(() => {
								this.$router.push('/')
							}, 3500)
						} else {
							this.snackbar = true
							this.text = 'An error occurred while creating account.'
						}
					})
			} else {
				this.snackbar = true
				this.text = 'Passwords do not match!'
			}
		}
	}
}
</script>
