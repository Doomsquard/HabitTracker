// import { Pie, mixins } from 'vue-chartjs'
// export default {
// 	extends: Pie,
// 	mixins: [mixins.reactiveProp],
// 	name: 'Wheel',
// 	props: ['chartData', 'options'],
// 	mounted() {
// 		this.renderChart(this.chartData, this.options)
// 	},
// }
import { Pie } from 'vue-chartjs'

export default {
	extends: Pie,
	type: 'doughnut',
	props: ['chartdata', 'options'],
	mounted() {
		// Overwriting base render method with actual data.
		this.renderChart(this.chartdata, this.options)
	},
}
