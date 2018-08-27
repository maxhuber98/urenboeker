import {
  Pie
} from 'vue-chartjs'

export default {
  extends: Pie,
  props: ['chartData'],
  computed: {
    getDays() {
      console.log(this.chartData)
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
        backgroundColor: '#f87979',
        data: this.getDays
      }],
    }, {
      resposive: true,
      maintainAspectRatio: false
    })
  }
}
