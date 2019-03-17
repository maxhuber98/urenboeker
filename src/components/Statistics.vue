<template>
  <div>
    <v-tabs fixed-tabs color="grey lighten-5" centered>
      <v-tab :key="1">Algemeen</v-tab>
      <v-tab :key="2">Per dag</v-tab>

      <v-tab-item :key="1">
        <h1 class="text-xs-center">Statistieken {{ year }}</h1>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <day-chart
                :styles="{height: '500px', width: '100%', position: 'relative'}"
                v-if="days"
                :chart-data="days"
              ></day-chart>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs12>
              <month-chart
                :style="{height: '500px', width: '100%', position: 'relative'}"
                v-if="months"
                :data="months"
              ></month-chart>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>

      <v-tab-item :key="2">
        <v-container>
          <h1 class="text-xs-center">{{ year }}</h1>
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
import moment from 'moment'

export default {
  components: { DayChart, MonthChart },
  mounted() {
    this.$store.commit('SET_LAYOUT', 'app-layout')
    this.year = moment().locale("nl").format("YYYY")
    this.getData()
  },
  data() {
    return {
      loading: false,
      year: null,
      months: null,
      days: null,
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
      times: []
    }
  },
  methods: {
    getData() {
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
    }
  }
}
</script>
