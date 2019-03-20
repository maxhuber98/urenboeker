<template>
  <div>
    <v-tabs fixed-tabs :class="{color : 'grey lighten-5'}" :dark="darkmode" centered>
      <v-tab :key="1">Algemeen</v-tab>
      <v-tab :key="2">Per dag</v-tab>

      <v-tab-item :key="1">
        <v-container>
          <v-layout class="justify-end mb-3">
            <v-flex xs3 align-center>
              <v-select
                class="pt-0"
                hide-details
                v-model="year"
                v-on:input="getData"
                :items="items"
              ></v-select>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12>
              <v-card>
                <v-card-text class="text-xs-center info mb-1">Aantal gewerkte dagen {{ year }}</v-card-text>

                <day-chart
                  :styles="{height: '500px', width: '100%', position: 'relative'}"
                  v-if="days"
                  :chart-data="days"
                ></day-chart>
              </v-card>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs12 class="mt-2">
              <v-card>
                <v-card-text class="text-xs-center info mb-1">Aantal gewerkte uren {{ year }}</v-card-text>
                <month-chart
                  :style="{height: '500px', width: '100%', position: 'relative'}"
                  v-if="months"
                  :data="months"
                ></month-chart>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>

      <v-tab-item :key="2">
        <v-container>
          <v-layout class="justify-end">
            <v-flex xs3 align-center>
              <v-select
                class="pt-0"
                hide-details
                v-model="year"
                v-on:input="getData"
                :items="items"
              ></v-select>
            </v-flex>
          </v-layout>
          <h2 class="text-xs-center">Totaal gewerkte uren per dag</h2>
          <v-layout>
            <v-flex xs12>
              <v-data-table :headers="headers" :items="times" hide-actions class="elevation-1">
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.day }}</td>
                  <td>{{ props.item.value }}</td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import DayChart from '../charts/DayChart'
import MonthChart from '../charts/MonthChart'
import moment, { min } from 'moment'
import getDarkMode from '../helpers/general'

export default {
  components: { DayChart, MonthChart },
  data() {
    return {
      loading: false,
      year: null,
      months: null,
      days: null,
      dates: {
        min: null,
        max: null
      },
      headers: [
        {
          text: 'Dag',
          value: 'day'
        },
        {
          text: 'Uren',
          value: 'value'
        }
      ],
      times: [],
      items: [],
      darkmode: false
    }
  },
  computed: {
    color() {
      return this.darkmode ? false : true
    }
  },
  mounted() {
    this.$store.commit('SET_LAYOUT', 'app-layout')
    this.year = moment().locale("nl").format("YYYY")
    this.getData()
    this.getYearsBasedOnMinMax()
    this.darkmode = getDarkMode()
  },
  methods: {
    getData() {
      this.months = false
      this.days = false
      axios.get(process.env.ROOT_API + '/stats/totalpermonth?year=' + this.year).then(resp => {
        this.months = resp.data
      })
      axios.get(process.env.ROOT_API + '/stats/daysperyear?year=' + this.year).then(data => {
        this.days = data.data
      })
      axios.get(process.env.ROOT_API + '/stats/daystatsperyear?year=' + this.year).then(data => {
        this.setTimesData(data.data)
      })
    },
    setTimesData(value) {
      let timesArray = []

      timesArray[0] = {
        "day": "Maandag",
        "value": value[0]
      }
      timesArray[1] = {
        "day": "Dinsdag",
        "value": value[1]
      }
      timesArray[2] = {
        "day": "Woensdag",
        "value": value[2]
      }
      timesArray[3] = {
        "day": "Donderdag",
        "value": value[3]
      }
      timesArray[4] = {
        "day": "Vrijdag",
        "value": value[4]
      }
      timesArray[5] = {
        "day": "Zaterdag",
        "value": value[5]
      }
      timesArray[6] = {
        "day": "Zondag",
        "value": value[6]
      }

      this.times = timesArray
    },
    getYearsBasedOnMinMax() {
      this.dates = this.$store.getters.getDates
      let years = []

      var minYear = moment(this.dates.min).format('YYYY')
      var currentYear = moment().locale("nl").format('YYYY')
      var diff = currentYear - minYear

      for (var i = diff; i >= 0; i--) {
        var year = moment().locale("nl").subtract(i, 'years').format('YYYY')
        this.items.push(year)
      }
    }
  }
}
</script>
