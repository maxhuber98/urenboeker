<template>
  <v-container>
    <v-layout row wrap>
      <h1>Toevoegen</h1>
      <v-flex xs12>
        <v-dialog
          ref="date"
          v-model="modal"
          :return-value.sync="date"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="date"
            label="Datum"
            prepend-icon="event"
            readonly
            required
          ></v-text-field>
          <v-date-picker v-model="date" :locale="'nl'" scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal = false">Annuleren</v-btn>
            <v-btn flat color="primary" @click="$refs.date.save(date)">OK</v-btn>
          </v-date-picker>
        </v-dialog>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs12>
        <v-dialog
          ref="start"
          v-model="modal2"
          :return-value.sync="start"
          persistent
          lazy
          full-width
          width="290px"
        >
          <v-text-field
            slot="activator"
            v-model="start"
            label="Begintijd"
            prepend-icon="access_time"
            readonly
            required
          ></v-text-field>
          <v-time-picker v-model="start" actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="modal2 = false">Annuleren</v-btn>
            <v-btn flat color="primary" @click="$refs.start.save(start)">OK</v-btn>
          </v-time-picker>
        </v-dialog>
      </v-flex>
      <v-spacer></v-spacer>
        <v-flex xs12>
          <v-dialog
            ref="end"
            v-model="modal3"
            :return-value.sync="end"
            persistent
            lazy
            full-width
            width="290px"
          >
            <v-text-field
              slot="activator"
              v-model="end"
              label="Eindtijd"
              prepend-icon="access_time"
              readonly
              required
            ></v-text-field>
            <v-time-picker v-model="end" actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="modal3 = false">Annuleren</v-btn>
              <v-btn flat color="primary" @click="$refs.end.save(end)">OK</v-btn>
            </v-time-picker>
          </v-dialog>
        </v-flex>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="total"
          label="Totaal"
          prepend-icon="alarm"
          :disabled="true"
          readonly
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="success" @click.native="addTimes" >Toevoegen</v-btn>
        <v-snackbar
          :timeout="3500"
          :bottom="true"
          v-model="snackbar"
        >
          {{ text }}
          <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
  data() {
    return {
      date: null,
      start: null,
      end: null,
      modal: false,
      modal2: false,
      modal3: false,
      snackbar: false,
      text: 'Uren zijn succesvol toegevoegd!'
    };
  },
  computed: {
    total() {
      const start = moment(this.start, 'HH:mm');
      const end = moment(this.end, 'HH:mm');
      var endDate = moment(this.date, 'DD-MM-YYYY').format('DD-MM-YYYY');
      const startDateTime = moment(
        this.date + ' ' + this.start,
        'DD-MM-YYYY HH:mm'
      );
      if (start > end) {
        endDate = moment(endDate, 'DD-MM-YYYY')
          .add(1, 'days')
          .format('DD-MM-YYYY');
      }
      const endDateTime = moment(endDate + ' ' + this.end, 'DD-MM-YYYY HH:mm');
      const minutes = endDateTime.diff(startDateTime, 'minutes');
      return this.date !== null && this.start !== null && this.end !== null
        ? this.getTimeFromMins(minutes)
        : '00:00';
    }
  },
  mounted() {
    this.$store.commit('SET_LAYOUT', 'app-layout');
  },
  methods: {
    getTimeFromMins(data) {
      var minutes = data % 60;
      var hours = (data - minutes) / 60;
      if (minutes < 10) minutes = '0' + minutes;
      return hours + ':' + minutes;
    },
    addTimes() {
      const data = {
        Start: this.start,
        End: this.end,
        Date: this.date
      };
      axios.post('http://localhost:5000/api/times', data).then(data => {
        if (data.data.status === 'success') {
          this.text = 'Uren zijn succesvol toegevoegd!';
          this.snackbar = true;
          (this.start = null), (this.end = null), (this.date = null);
          this.$store.dispatch('setTotal')
        } else {
          this.text =
            'Er is een fout opgetreden bij het toevoegen van de uren.';
          this.snackbar = true;
        }
      });
    }
  }
};
</script>
