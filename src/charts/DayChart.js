import {
  Pie
} from 'vue-chartjs'
import {
  randomColor
} from '../helpers/colors'

export default {
  extends: Pie,
  props: ['chartData'],
  computed: {
    getDays() {
      return this.stripData()
    }
  },
  methods: {
    stripData() {
      const rtrn = []
      const days = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag']
      days.forEach((item) => {
        rtrn.push(this.chartData[item])
      })
      return rtrn
    }
  },
  mounted() {
    this.renderChart({
      labels: ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'],
      datasets: [{
        backgroundColor: [
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor()
        ],
        data: this.getDays
      }],
    }, {
      resposive: true,
      maintainAspectRatio: false
    })
  }
}
