<template>
	<div>
		<router-view />
		<div class="activity">
			<div class="activity__wrapper">
				<div class="activity__wrapper__menu">calendar\track activity here</div>
				<div class="activity__wrapper__wrap">
					<div
						class="activity__wrapper__cards"
						v-for="dayData in objectLoad"
						:key="dayData.day"
						:id="dayData.day"
					>
						<div class="activity__wrapper__card">
							<div
								class="activity__wrapper__card__title"
								style="display:flex;justify-content:space-between"
							>
								<div>{{ dayData.day }}{{ monthName[currentMonth] }}</div>

								<div style="margin-right: 5px;">
									{{ dayData.weekDay }}
								</div>
							</div>
							<div class="activity__wrapper__card__main">
								<div class="activity__wrapper__card__main__item">
									<div class="activity__wrapper__card__main__info">
										<div class="activity__wrapper__card__main__segment">segment</div>
										<div class="activity__wrapper__card__main__name">name</div>
										<div class="activity__wrapper__card__main__time">time</div>
									</div>
									<div class="activity__wrapper__card__main__state">
										state
									</div>
								</div>
							</div>
							<div class="activity__wrapper__card__footer">
								<div class="activity__wrapper__card__footer_wrapper">
									<img src="@/assets/img/plus.svg" width="20" height="20" alt="add new item" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ActivityComponent',
		data() {
			return {
				currentDay: null,
				currentMonth: null,
				currentYear: null,
				dayOfWeek: 1,
				countDays: 30,
				objectLoad: [],
				monthName: {
					0: 'January',
					1: 'February',
					2: 'March',
					3: 'April',
					4: 'May',
					5: 'June',
				},
				dayName: {
					1: 'Monday',
					2: 'Tuesday',
					3: 'Wednesday',
					4: 'Thursday',
					5: 'Friday',
					6: 'Saturday',
					7: 'Sunday',
				},
			}
		},
		async mounted() {
			this.currentDay = new Date(Date.now()).getDate()
			this.currentMonth = new Date(Date.now()).getMonth()
			this.currentYear = new Date(Date.now()).getFullYear()
			this.dayOfWeek = new Date(Date.now()).getDay()
			await this.daysInMonth()
			await this.loadData()

			this.$el.children[1].children[0].children[1].scrollLeft = this.currentDay * 303
		},
		methods: {
			daysInMonth() {
				this.countDays =
					32 -
					new Date(new Date(Date.now()).getFullYear(), new Date(Date.now()).getMonth(), 32).getDate()
			},
			loadData() {
				for (let i = 0; i < this.countDays; i++) {
					this.objectLoad.push({
						day: i + 1,
						month: this.currentMonth,
						data: {},
						weekDay: this.dayName[new Date(this.currentYear, this.currentMonth, i + 1).getDay()],
					})
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.activity {
		margin-left: 15%;
		height: calc(100vh - 50px);
		&__wrapper {
			display: flex;
			flex-direction: column;
			height: 100%;
			min-height: 100%;
			&__wrap {
				height: 100%;
				display: flex;
				overflow-y: auto;
				overflow-x: auto;
			}
			&__cards {
				width: 100%;
				height: fit-content;
				min-height: 400px;
				// display: flex;
			}
			&__card {
				background-color: #ebecf0;
				display: flex;
				flex-direction: column;
				margin: 15px;
				min-width: 300px;
				min-height: 200px;

				border-radius: 3%;
				&__title {
					display: flex;
					justify-content: flex-start;
					margin-left: 5px;
					align-items: center;
					min-height: 30px;
					font-size: 1.1rem;
					opacity: 0.9;
					&::after {
						content: '';
						position: absolute;
						left: 0;
						right: 0;
						top: 100%;
						height: 4px;
						background: linear-gradient(
							180deg,
							rgba(9, 30, 66, 0.13) 0,
							rgba(9, 30, 66, 0.13) 1px,
							rgba(9, 30, 66, 0.08) 1px,
							rgba(9, 30, 66, 0) 4px
						);
					}
				}
				&__main {
					flex: 1 0 0;
					display: flex;
					justify-content: space-between;
					margin: 10px 7px 0px 7px;
					margin-top: 10px;

					&__item {
						display: flex;
						justify-content: space-between;
						width: 100%;
						height: fit-content;
						border-radius: 5px;
						background-color: #fff;
					}
					&__info {
						margin-left: 5px;
					}
					&__segment {
						display: flex;
					}
					&__name {
						display: flex;
					}
					&__time {
						display: flex;
					}
					&__state {
						margin-right: 5px;
					}
				}
				&__footer {
					height: 30px;
					justify-content: center;
					align-items: center;
					border-top: 1px solid #ddd;
					cursor: pointer;
					border-bottom-left-radius: 5px;
					border-bottom-right-radius: 5px;
					img {
						opacity: 0.6;
					}
					&:hover {
						background-color: rgba(9, 30, 66, 0.08);
						img {
							opacity: 0.9;
						}
					}
				}
			}
		}
	}
</style>
