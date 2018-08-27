<template>
  <v-container>
    <v-layout>
      <!-- <h1>Statistieken</h1> -->
      <day-chart :styles="{height: '500px', width: '100%', position: 'relative'}" v-if="days" :chart-data="days"></day-chart>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import DayChart from '../charts/DayChart'

export default {
  components: { DayChart },
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
