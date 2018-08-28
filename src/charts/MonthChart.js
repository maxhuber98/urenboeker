import {
  Bar
} from 'vue-chartjs'
import {
  randomColor
} from '../helpers/colors'

export default {
  extends: Bar,
  props: ['data'],
  computed: {
    getMonths() {
      return this.stripData()
    }
  },
  methods: {
    stripData() {
      const rtrn = []
      const months = [
        'januari',
        'februari',
        'maart',
        'april',
        'mei',
        'juni',
        'juli',
        'augustus',
        'september',
        'oktoboer',
        'novermber',
        'december'
      ]
      months.forEach(item => {
        rtrn.push(this.data[item])
      })
      return rtrn
    }
  },
  mounted() {
    this.renderChart({
      labels: [
        'januari',
        'februari',
        'maart',
        'april',
        'mei',
        'juni',
        'juli',
        'augustus',
        'september',
        'oktoboer',
        'novermber',
        'december'
      ],
      datasets: [{
        label: 'uren',
        backgroundColor: [
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor(),
          randomColor()
        ],
        data: this.getMonths
      }]
    }, {
      resposive: true,
      maintainAspectRatio: false
    })
  }
}
