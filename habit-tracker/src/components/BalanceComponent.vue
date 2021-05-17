<template>
	<div>
		<router-view />
		<div class="balanceWheel">
			<p class="balanceWheel__title">Колесо баланса</p>
			<Wheel class="balanceWheel__wheel" :chartdata="chartdata" :options="options" />
		</div>
	</div>
</template>

<script>
	import Wheel from '@/components/graphics/WheelBalance'
	export default {
		name: 'WheelComponent',
		components: { Wheel },
		data() {
			return {
				chartdata: {
					labels: [
						'Творчество',
						'Здоровье и спорт',
						'Саморазвитие',
						'Деньги',
						'Друзья и окружение',
						'Семья и отношения',
						'Впечатления',
						'Карьера',
					],
					datasets: [
						{
							label: 'GitHub Commits',
							backgroundColor: [
								'rgba(255, 0, 0, 0.7)',
								'rgba(255, 221, 0, 0.7)',
								'rgba(168, 201, 0, 0.7)',
								'rgba(60, 201, 0, 0.7)',
								'rgba(87, 193, 255, 0.7)',
								'rgba(0, 54, 214, 0.7)',
								'rgba(110, 0, 227, 0.7)',
								'rgba(227, 0, 223, 0.7)',
							],
							data: [40, 20, 12, 39, 10, 40, 39, 80],
							borderWidth: 1,
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					animation: {
						animateScale: true,
					},
					scales: {
						xAxes: [
							{
								display: false,
							},
						],
						yAxes: [
							{
								display: false,
							},
						],
					},
				},
			}
		},
	}
</script>

<style lang="scss" scoped>
	.balanceWheel {
		margin-left: 15%;
		height: calc(100vh - 50px);
		&__title {
			margin-top: 20px;
			font-size: 1.3rem;
		}
		&__wheel {
			margin-top: 50px;
		}
	}
</style>
