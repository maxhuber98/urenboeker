import { Bar } from 'vue-chartjs';

export default {
  extends: Bar,
  props: ['data'],
  computed: {
    getMonths() {
      return this.stripData();
    }
  },
  methods: {
    stripData() {
      const rtrn = [];
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
      ];
      months.forEach(item => {
        rtrn.push(this.data[item]);
      });
      return rtrn;
    }
  },
  mounted() {
    this.renderChart(
      {
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
        datasets: [
          {
            label: 'uren',
            backgroundColor: '#f87979',
            data: this.getMonths
          }
        ]
      },
      {
        resposive: true,
        maintainAspectRatio: false
      }
    );
  }
};
