<template>
  <v-container>
    <v-card>
      <v-card-text>Klik op de onderstaande knop om de gegevens naar een .csv bestand te exporteren.</v-card-text>
      <v-card-actions>
        <v-btn block color="primary" @click="getAllData">Exporteren
          <v-icon>get_app</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar :timeout="3500" bottom v-model="action">{{ status }}</v-snackbar>
  </v-container>
</template>

<script>
import Axios from 'axios'
import { ExportToCsv } from 'export-to-csv';
export default {
  data() {
    return {
      action: false,
      status: ''
    }
  },
  mounted() {
    this.$store.commit('SET_LAYOUT', 'app-layout');
  },
  methods: {
    getAllData() {
      this.action = true
      Axios.get(process.env.ROOT_API + '/times/getallbyuser').then((resp) => {
        if (resp.data.length > 0) {
          this.convertDataToCSV(resp.data)
          this.status = "Data is succesvol geëxporteerd."
        } else {
          this.status = "Er kon geen data gevonden worden."
        }
      })
    },
    convertDataToCSV(array) {
      var data = this.formatData(array)

      const options = {
        filename: 'uren',
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        showTitle: true,
        title: 'Uren overzicht',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: false,
        headers: ['Datum', 'Starttijd', 'Eindtijd', 'Totaal']
      }

      const csvExporter = new ExportToCsv(options)

      csvExporter.generateCsv(data)
    },
    formatData(array) {
      const returnArray = []

      array.forEach(function (item) {
        let obj = {
          'date': item.date,
          'start': item.start,
          'end': item.end,
          'total': item.total
        }

        returnArray.push(obj)
      })

      return returnArray
    }
  }
}
</script>