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
                  <v-text-field prepend-icon="person" name="Email" label="Email" type="text" v-model="credentials.username" required></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="Password" label="Password" type="password" v-model="credentials.password" required></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                  <router-link :to="'register'" style="color: white; text-decoration: none">
                    <v-btn color="primary">Register</v-btn>
                  </router-link>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
	data: () => ({
		drawer: null,
		credentials: {
			username: '',
			password: ''
		}
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
		}
	}
}
</script>
