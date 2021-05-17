<template>
	<div>
		<router-view />
		<div class="stats">
			<div class="stats_header">
				<div class="stats_header__title fs-3" style="opacity:0.8">Статистика активностей</div>
				<div>Выбрать промежуток времени</div>
			</div>
			<div class="stats__date">
				<input
					class="stats__date__item"
					type="date"
					id="start"
					name="start"
					min="2021-01-01"
					@change="(e) => changeDate(e)"
					value="2021-01-01"
				/>
				<input
					class="stats__date__item"
					type="date"
					id="start"
					name="start"
					min="2021-01-02"
					@change="(e) => changeDate(e)"
					value="2021-12-31"
				/>
			</div>

			<StatsGraph :chartdata="chartdata" :options="options" />
		</div>
	</div>
</template>

<script>
	import StatsGraph from '@/components/graphics/StatsGraph'

	export default {
		name: 'StatsComponent',
		components: { StatsGraph },
		data() {
			return {
				chartdata: {
					labels: [
						'Январь',
						'Февраль',
						'Март',
						'Апрель',
						'Март',
						'Июнь',
						'Июль',
						'Август',
						'Сентябрь',
						'Октябрь',
						'Ноябрь',
						'Декабрь',
						// 'Творчество',
						// 'Здоровье и спорт',
						// 'Саморазвитие',
						// 'Деньги',
						// 'Друзья и окружение',
						// 'Семья и отношения',
						// 'Впечатления',
						// 'Карьера',
					],
					datasets: [
						{
							label: 'Творчество',
							backgroundColor: [
								'rgba(255, 0, 0, 0.7)',
								// 'rgba(255, 221, 0, 0.7)',
								// 'rgba(168, 201, 0, 0.7)',
								// 'rgba(60, 201, 0, 0.7)',
								// 'rgba(87, 193, 255, 0.7)',
								// 'rgba(0, 54, 214, 0.7)',
								// 'rgba(110, 0, 227, 0.7)',
								// 'rgba(227, 0, 223, 0.7)',
							],
							data: [40, 20, 12, 39, 10, 40, 39, 80],
							borderWidth: 1,
						},
						{
							label: 'Здоровье и спорт',
							backgroundColor: ['rgba(255, 221, 0, 0.7)'],
							data: [50, 100, 12, 39, 10, 55, 34, 99],
							borderWidth: 1,
						},
						{
							label: 'Саморазвитие',
							backgroundColor: ['rgba(168, 201, 0, 0.7)'],
							data: [32, 24, 41, 61, 75, 40, 91, 44],
							borderWidth: 1,
						},
						{
							label: 'Деньги',
							backgroundColor: ['rgba(60, 201, 0, 0.7)'],
							data: [40, 20, 12, 39, 10, 40, 39, 80],
							borderWidth: 1,
						},
						{
							label: 'Семья и отношения',
							backgroundColor: ['rgba(0, 54, 214, 0.7)'],
							data: [50, 100, 12, 39, 10, 55, 34, 99],
							borderWidth: 1,
						},
						{
							label: 'Друзья и окружение',
							backgroundColor: ['rgba(87, 193, 255, 0.7)'],
							data: [50, 100, 12, 39, 10, 55, 34, 99],
							borderWidth: 1,
						},
						{
							label: 'Впечатления',
							backgroundColor: ['rgba(110, 0, 227, 0.7)'],
							data: [50, 100, 12, 39, 10, 55, 34, 99],
							borderWidth: 1,
						},
						{
							label: 'Карьера',
							backgroundColor: ['rgba(227, 0, 223, 0.7)'],
							data: [50, 100, 12, 39, 10, 55, 34, 99],
							borderWidth: 1,
						},
					],
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
				},
			}
		},
	}
</script>

<style lang="scss" scoped>
	.stats {
		margin-left: 15%;
		height: calc(100vh - 50px);
		&__date {
			margin-bottom: 30px;
			&__item {
				margin: 10px;
			}
		}
	}
</style>
