<template>
	<div>
		<router-view />
		<div class="activity">
			<ActivityModal
				v-if="modalACtivity"
				:currentDay="modalDay"
				:currentMonth="modalMonth"
				@closeWindow="closeWindow"
			/>
			<ActivityTrackModal v-if="modalTrackActivity" @closeWindow="closeWindow" />
			<div class="activity__wrapper">
				<div class="activity__wrapper__menu">
					<input
						type="month"
						id="start"
						name="start"
						min="2021-05"
						@change="(e) => changeDate(e)"
						value="2021-05"
					/>
					<b-button class="activity__wrapper__menu__track" @click="trackActivityHandler"
						>Track Activity</b-button
					>
				</div>
				<div class="activity__wrapper__wrap">
					<div
						class="activity__wrapper__cards"
						v-for="dayData in objectLoad"
						:key="dayData.day"
						:id="dayData.day"
					>
						<div class="activity__wrapper__card" :ref="dayData.day">
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
							<div
								class="activity__wrapper__card__footer"
								@click="addNewActivity(dayData.day, monthName[currentMonth])"
							>
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
	import ActivityModal from './activityModal'
	import ActivityTrackModal from './activityTrackModal'

	export default {
		name: 'ActivityComponent',
		components: { ActivityModal, ActivityTrackModal },
		data() {
			return {
				currentDay: null,
				currentMonth: null,
				currentYear: null,
				dayOfWeek: 1,
				modalDay: null,
				modalMonth: null,
				countDays: 30,
				objectLoad: [],
				value: null,
				monthName: {
					0: 'January',
					1: 'February',
					2: 'March',
					3: 'April',
					4: 'May',
					5: 'June',
					6: 'July',
					7: 'August',
				},
				dayName: {
					0: 'Sunday',
					1: 'Monday',
					2: 'Tuesday',
					3: 'Wednesday',
					4: 'Thursday',
					5: 'Friday',
					6: 'Saturday',
				},
				modalACtivity: false,
				modalTrackActivity: false,
			}
		},
		async mounted() {
			this.currentDay = new Date(Date.now()).getDate()
			this.currentMonth = new Date(Date.now()).getMonth()
			this.currentYear = new Date(Date.now()).getFullYear()
			this.dayOfWeek = new Date(Date.now()).getDay()
			await this.loadCards()
		},
		methods: {
			async loadCards() {
				await this.daysInMonth()
				await this.loadData()
				if (
					this.currentMonth === new Date(Date.now()).getMonth() &&
					this.currentYear === new Date(Date.now()).getFullYear()
				) {
					const leftScroll = this.$refs[this.currentDay][0].offsetLeft
					this.$el.children[1].children[0].children[1].scrollLeft = leftScroll - window.innerWidth / 6
				} else {
					this.$el.children[1].children[0].children[1].scrollLeft = 0
				}
			},
			daysInMonth() {
				this.countDays =
					32 -
					new Date(new Date(Date.now()).getFullYear(), new Date(Date.now()).getMonth(), 32).getDate()
			},
			loadData() {
				this.objectLoad = []
				for (let i = 0; i < this.countDays; i++) {
					this.objectLoad.push({
						day: i + 1,
						month: this.currentMonth,
						data: {},
						weekDay: this.dayName[new Date(this.currentYear, this.currentMonth, i + 1).getDay()],
					})
				}
			},
			addNewActivity(day, month) {
				this.modalACtivity = !this.modalACtivity
				this.modalDay = day
				this.modalMonth = month
			},
			trackActivityHandler() {
				this.modalTrackActivity = !this.modalTrackActivity
			},
			closeWindow() {
				this.modalACtivity = false
				this.modalTrackActivity = false
			},
			setToday() {
				const now = new Date()
				this.value = new Date(now.getFullYear(), now.getMonth(), now.getDate())
			},
			clearDate() {
				this.value = ''
			},
			changeDate(e) {
				const newDate = e.target.value.split('-')
				this.currentYear = +newDate[0]
				this.currentMonth = +newDate[1] - 1
				console.log(this.currentYear, this.currentMonth)
				this.loadCards()
			},
		},
	}
</script>

<style lang="scss" scoped>
	.activity {
		margin-left: 16%;
		height: calc(100vh - 40px);
		&__wrapper {
			display: flex;
			flex-direction: column;
			height: 100%;
			min-height: 100%;
			&__menu {
				display: flex;
				justify-content: space-around;
				&__track {
					font-size: 0.9rem;
					height: 30px;
					width: 120px;
					white-space: nowrap;
					text-align: center;
					display: flex;
					align-items: center;
					margin-top: 20px;
					background-color: #95e2ec;
					border: none;
					color: black;
					&:hover {
						background-color: #147581;
					}
				}
			}
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
	#start {
		margin-top: 20px;
		border-radius: 3px;
		border: 2px solid #95e2ec;
	}
</style>
