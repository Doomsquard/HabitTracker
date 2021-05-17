import { Line } from 'vue-chartjs'

export default {
	extends: Line,
	props: ['chartdata', 'options'],
	mounted() {
		// Overwriting base render method with actual data.
		this.renderChart(this.chartdata, this.options)
	},
}
