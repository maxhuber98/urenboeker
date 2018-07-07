<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Welkom {{ getUsername }}!</h3>
              <div><b>Het is vandaag {{ date }}.</b></div>
              <div>Je hebt de huidige maand {{ total.hours }} uur en {{ total.minutes }} minuten gewerkt.</div>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			date: '',
			total: {
				hours: 0,
				minutes: 0
			},
			user: ''
		}
	},
	computed: {
		getUsername() {
			const user = localStorage.getItem('username')
			return user.split('@')[0]
		}
	},
	filters: {
		userName(val) {
			return val.split('@')[0]
		}
	},
	mounted() {
		this.$store.commit('SET_LAYOUT', 'app-layout')
		this.date = moment()
			.locale('nl')
			.format('dddd D MMMM')
		this.getTotal()
	},
	methods: {
		getTotal() {
			this.total = this.$store.getters.getTotal
		},
	}
}
</script>
