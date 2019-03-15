<template>
  <v-container>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-dialog
                  ref="date"
                  v-model="dateModal"
                  :return-value.sync="editedItem.date"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="editedItem.date"
                    label="Datum"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="editedItem.date" :locale="'nl'" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="dateModal = false">Annuleren</v-btn>
                    <v-btn flat color="primary" @click="$refs.date.save(editedItem.date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-dialog
                  ref="dialog"
                  v-model="modal2"
                  :return-value.sync="editedItem.start"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="editedItem.start"
                    label="Begintijd"
                    prepend-icon="access_time"
                    readonly
                  ></v-text-field>
                  <v-time-picker v-model="editedItem.start" actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal2 = false">Annuleren</v-btn>
                    <v-btn flat color="primary" @click="$refs.dialog.save(editedItem.start)">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-dialog
                  ref="end"
                  v-model="modal3"
                  :return-value.sync="editedItem.end"
                  persistent
                  lazy
                  full-width
                  width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="editedItem.end"
                    label="Eindtijd"
                    prepend-icon="access_time"
                    readonly
                  ></v-text-field>
                  <v-time-picker v-model="editedItem.end" actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="modal3 = false">Annuleren</v-btn>
                    <v-btn flat color="primary" @click="$refs.end.save(editedItem.end)">OK</v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  v-model="total"
                  label="Totaal"
                  prepend-icon="alarm"
                  :disabled="true"
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <h1>Uren overzicht</h1>
    <div class="text-xs-center">
      <h2>{{ date | displayDate }}</h2>
    </div>
    <v-data-table :headers="headers" :items="uren" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date | filterDate }}</td>
        <td>{{ props.item.start }}</td>
        <td>{{ props.item.end }}</td>
        <td>{{ props.item.total }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="showDeleteDialog(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="footer">
        <td>
          <strong>Totaal:</strong>
        </td>
        <td>{{ monthTotal }}</td>
        <td></td>
        <td></td>
      </template>
      <template slot="no-data">
        <div class="text-xs-center" v-if="loading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </div>
      </template>
    </v-data-table>
    <v-layout row>
      <v-flex xs6>
        <div class="text-xs-left">
          <v-btn class="ml-0" v-if="prevBtn" color="primary" @click="prevMonth">Vorige</v-btn>
        </div>
      </v-flex>
      <v-flex xs6>
        <div class="text-xs-right">
          <v-btn class="mr-0" v-if="nextBtn" color="primary" @click="nextMonth">Volgende</v-btn>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-dialog v-model="deleteDialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Weet je zeker dat je de uren wilt verwijderen?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="deleteDialog = false">Annuleren</v-btn>
            <v-btn color="red darken-1" flat @click.native="deleteItem()">Verwijderen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-snackbar :timeout="3500" :bottom="true" v-model="deleted">
      {{ deletedText }}
      <v-btn flat color="pink" @click.native="deleted = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar :timeout="3500" :bottom="true" v-model="updated">
      {{ updatedText }}
      <v-btn flat color="pink" @click.native="deleted = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from 'axios';
import moment, { min } from 'moment';

export default {
  mounted() {
    this.$store.commit('SET_LAYOUT', 'app-layout');
  },
  data() {
    return {
      dialog: false,
      deleteDialog: false,
      modal2: false,
      modal3: false,
      uren: [],
      headers: [
        {
          text: 'Datum',
          value: 'date'
        },
        {
          text: 'Begintijd',
          value: 'start'
        },
        {
          text: 'Eindtijd',
          value: 'end'
        },
        {
          text: 'Totaal',
          value: 'total'
        }
      ],
      editedIndex: -1,
      editedItem: {
        id: null,
        start: null,
        end: null,
        date: null,
        total: null
      },
      dateModal: false,
      date: '2019/3/02',
      loading: false,
      dates: {
        min: null,
        max: null
      },
      selectedDeleteItem: null,
      deleted: false,
      deletedText: '',
      updated: false,
      updatedText: ''
    }
  },
  mounted() {
    this.$store.commit('SET_LAYOUT', 'app-layout')
    this.getData()
    this.getDates()
    this.date = moment().locale("nl").format("YYYY/M/DD")
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.uren.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    showDeleteDialog(item) {
      this.deleteDialog = true
      this.selectedDeleteItem = item
    },
    deleteItem() {
      const item = this.selectedDeleteItem
      const index = this.uren.indexOf(item);
      // Delete item in db
      axios.post(process.env.ROOT_API + '/times/Delete?id=' + item.id).then(resp => {
        if (resp.data.status === "success") {
          this.deletedText = 'Uren zijn succesvol verwijderd!'
          this.$store.dispatch('setTotal')
          this.$store.dispatch('setDates')
        } else {
          this.deletedText = 'Er is een fout opgetreden bij het verwijderen van de uren.'
        }
        this.deleted = true
      })
      this.uren.splice(index, 1)
      this.deleteDialog = false
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        // Update item
        const date = moment(this.editedItem.date, 'YYYY-MM-DD').format('YYYY/M/DD')
        const test = {
          Id: this.editedItem.id,
          Start: this.editedItem.start,
          End: this.editedItem.end,
          Date: date
        };
        axios.put(process.env.ROOT_API + '/times', test).then(resp => {
          if (resp.data.status === 'success') {
            this.updatedText = 'Uren zijn succesvol bijgewerkt!'
            this.$store.dispatch('setTotal')
          } else {
            this.updatedText = 'Er is een fout opgetreden bij het bijwerken van de uren.'
          }
          this.updated = true
        })
        this.editedItem.total = this.total
        Object.assign(this.uren[this.editedIndex], this.editedItem)
      } else {
        this.uren.push(this.editedItem)
      }
      this.close();
    },
    getTimeFromMins(data) {
      var minutes = data % 60
      var hours = (data - minutes) / 60
      if (minutes < 10) minutes = '0' + minutes
      if (hours < 10) hours = '0' + hours
      return hours + ':' + minutes
    },
    getData() {
      this.loading = true
      axios
        .get(process.env.ROOT_API + '/times/byDate?val=' + this.date)
        .then(resp => {
          this.uren = resp.data
          this.loading = false
          this.monthTotal
        })
    },
    prevMonth() {
      const date = moment(this.date, 'YYYY/M/DD')
      this.date = date.subtract(1, 'months').format('YYYY/M/DD')
      this.getData()
    },
    nextMonth() {
      const date = moment(this.date, 'YYYY/M/DD')
      this.date = date.add(1, 'months').format('YYYY/M/DD')
      this.getData()
    },
    getDates() {
      this.dates = this.$store.getters.getDates
    }
  },
  computed: {
    total() {
      const start = moment(this.editedItem.start, 'HH:mm')
      const end = moment(this.editedItem.end, 'HH:mm')
      var endDate = moment(this.editedItem.date, 'DD-MM-YYYY').format(
        'DD-MM-YYYY'
      )
      const startDateTime = moment(
        this.editedItem.date + ' ' + this.editedItem.start,
        'DD-MM-YYYY HH:mm'
      )
      if (start > end) {
        endDate = moment(endDate, 'DD-MM-YYYY')
          .add(1, 'days')
          .format('DD-MM-YYYY')
      }
      const endDateTime = moment(
        endDate + ' ' + this.editedItem.end,
        'DD-MM-YYYY HH:mm'
      )
      const minutes = endDateTime.diff(startDateTime, 'minutes')
      return this.editedItem.date !== null &&
        this.editedItem.start !== null &&
        this.editedItem.end !== null
        ? this.getTimeFromMins(minutes)
        : '00:00'
    },
    minDate() {
      const date = moment(this.dates.min, 'YYYY-MM-DD').format('YYYY-MM')
      return date
    },
    maxDate() {
      const date = moment(this.dates.max, 'YYYY-MM-DD').format('YYYY-MM')
      return date
    },
    prevBtn() {
      const date = moment(this.date, 'YYYY-MM-DD').format('YYYY-MM')
      if (this.minDate < date)
        return true
      return false
    },
    nextBtn() {
      const now = moment().format('YYYY-MM')
      const date = moment(this.date, 'YYYY-MM-DD').format('YYYY-MM')
      if (now > date)
        return true
      return false
    },
    monthTotal() {
      var hours = 0
      var minutes = 0
      this.uren.forEach(item => {
        var h = item.total.split(':')[0]
        var m = item.total.split(':')[1]
        if (h.charAt(0) === '0') {
          h = h.substr(1)
        }
        if (m.charAt(0) === '0') {
          m = m.substr(1)
        }
        hours += parseInt(h)
        minutes += parseInt(m)
      })
      if (minutes >= 60) {
        var timesGreater = Math.floor(minutes / 60)
        minutes -= timesGreater * 60
        hours += timesGreater
      }
      minutes = minutes < 10 ? '0' + minutes : minutes
      hours = hours < 10 ? '0' + hours : hours
      return hours + ':' + minutes
    }
  },
  filters: {
    displayDate(date) {
      const newDate = moment(date, 'YYYY-MM-DD')
      return moment(newDate).locale('nl').format('MMMM YYYY')
    },
    filterDate(date) {
      return moment(date, 'YYYY-MM-DD').format('DD-M-YY')
    }
  }
};
</script>
