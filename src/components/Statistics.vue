<template>
  <v-container>
    <v-layout row wrap>
      <h1>Statistieken</h1>
      <v-flex xs12>
        <day-chart :styles="{height: '500px', width: '100%', position: 'relative'}" v-if="days" :chart-data="days"></day-chart>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12>
        <month-chart :style="{height: '500px', width: '100%', position: 'relative'}" v-if="months" :data="months"></month-chart>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import DayChart from '../charts/DayChart'
import MonthChart from '../charts/MonthChart'

export default {
  components: { DayChart, MonthChart },
  mounted() {
    this.$store.commit('SET_LAYOUT', 'app-layout')
    this.getData()
  },
  data() {
    return {
      loading: false,
      year: 2018,
      months: null,
      days: null
    }
  },
  methods: {
    getData() {
      axios.get('http://localhost:5000/api/stats/totalpermonth?year=' + this.year).then(resp => {
        this.months = resp.data
      })
      axios.get('http://localhost:5000/api/stats/daysperyear?year=' + this.year).then(data => {
        this.days = data.data
      })
    }
  }
}
</script>
