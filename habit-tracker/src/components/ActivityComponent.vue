<template>
	<div>
		<router-view />
		<div class="activity">
			<ActivityModal
				v-if="modalACtivity"
				:currentDay="modalDay"
				:currentMonth="modalMonth"
				:currentYear="modalYear"
				@closeWindow="closeWindow"
				@addActivity="(item) => addActivity(item)"
			/>
			<ActivityTrackModal v-if="modalTrackActivity" @closeWindow="closeWindow" />
			<ChangeActivity
				v-if="changeActivity"
				:active="changeActivityComponent"
				@closeWindow="closeWindow"
				@endActivity="(id) => endActivity(id)"
				@deleteActivity="(id) => deleteActivity(id)"
				@changeItem="(item) => changeItem(item)"
			/>
			<div class="activity__wrapper">
				<div class="activity__wrapper__menu">
					<input
						type="month"
						id="start"
						name="start"
						min="2021-05"
						ref="date"
						@change="(e) => changeDate(e)"
						lang="en"
						value="2021-05"
					/>
					<b-button class="activity__wrapper__menu__track" @click="trackActivityHandler"
						>Отследить Активность</b-button
					>
				</div>
				<div class="activity__wrapper__wrap">
					<div
						class="activity__wrapper__cards"
						v-for="(dayData, index) in objectLoad"
						:key="dayData.day + index"
						:id="dayData.day"
					>
						<div class="activity__wrapper__card" :ref="dayData.day">
							<div
								:class="['activity__wrapper__card__title', bgCurrentDay(dayData.day)]"
								style="display:flex;justify-content:space-between"
							>
								<div>{{ dayData.day }}{{ monthName[currentMonth] }}</div>

								<div style="margin-right: 5px;">
									{{ dayData.weekDay }}
								</div>
							</div>
							<div class="activity__wrapper__card__main">
								<div
									v-for="(active, id) in dayData.data"
									:class="['activity__wrapper__card__main__item', doneBg(active.done)]"
									:key="id"
									:style="`background-color:${selectSegment(active.seg).color || '#FFF'}`"
									@click="handlerActivityModal(active)"
								>
									<div class="activity__wrapper__card__main__info">
										<div class="activity__wrapper__card__main__segment">
											{{ selectSegment(active.seg).name }}
										</div>
										<div class="activity__wrapper__card__main__name">{{ active.desc }}</div>
										<div class="activity__wrapper__card__main__time">
											{{ `${correctTime(active.start_time)} - ${correctTime(active.end_time)}` }}
										</div>
									</div>
									<div class="activity__wrapper__card__main__state">
										<div v-if="active.done" class="activity__wrapper__card__main__state__done"></div>
									</div>
								</div>
							</div>
							<div
								class="activity__wrapper__card__footer"
								@click="addNewActivity(dayData.day, monthName[currentMonth], currentYear)"
							>
								<div class="activity__wrapper__card__footer_wrapper">
									+
									<!-- <img src="@/assets/img/plus.svg" width="20" height="20" alt="add new item" /> -->
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
	import ChangeActivity from './ChangeActivity'
	import Api from '../api/api'

	export default {
		name: 'ActivityComponent',
		components: { ActivityModal, ActivityTrackModal, ChangeActivity },
		data() {
			return {
				currentDay: null,
				currentMonth: null,
				currentYear: null,
				dayOfWeek: 1,
				modalDay: null,
				modalMonth: null,
				modalYear: null,
				countDays: 30,
				objectLoad: [],
				activityData: null,
				value: null,
				monthName: {
					0: 'Января',
					1: 'Февраля',
					2: 'Марта',
					3: 'Апреля',
					4: 'Мая',
					5: 'Июня',
					6: 'Июля',
					7: 'Августа',
				},
				dayName: {
					0: 'Воскресенье',
					1: 'Понедельник',
					2: 'Вторник',
					3: 'Среда',
					4: 'Четверг',
					5: 'Пятница',
					6: 'Суббота',
				},
				bg: {
					1: {
						name: 'Творчество',
						color: 'rgba(255, 0, 0, 0.3)',
					},
					2: {
						name: 'Здоровье и спорт',
						color: 'rgba(255, 221, 0, 0.3)',
					},
					3: {
						name: 'Саморазвитие',
						color: 'rgba(168, 201, 0, 0.3)',
					},
					4: {
						name: 'Деньги',
						color: 'rgba(60, 201, 0, 0.3)',
					},
					5: {
						name: 'Друзья и окружение',
						color: 'rgba(87, 193, 255, 0.3)',
					},
					6: {
						name: 'Семья и отношения',
						color: 'rgba(0, 54, 214, 0.3)',
					},
					7: {
						name: 'Карьера',
						color: 'rgba(110, 0, 227, 0.3)',
					},
					8: {
						name: 'Впечатления',
						color: 'rgba(227, 0, 223, 0.3)',
					},
				},
				modalACtivity: false,
				modalTrackActivity: false,
				changeActivity: false,
				changeActivityComponent: null,
			}
		},
		async mounted() {
			this.currentDay = new Date(Date.now()).getDate()
			this.currentMonth = new Date(Date.now()).getMonth()
			this.currentYear = new Date(Date.now()).getFullYear()
			this.dayOfWeek = new Date(Date.now()).getDay()
			await Api.get('/activities')
				.then((data) => {
					console.log(data)
					this.activityData = data.data.data
				})
				.catch(() => {
					this.$store.dispatch('tokenModule/checkToken').then(() => {
						Api.get('/activities').then((data) => {
							this.activityData = data.data.data
						})
					})
				})
			this.loadCards()
		},
		methods: {
			async loadCards(type) {
				await this.daysInMonth()
				await this.loadData()
				if (type !== 'put') {
					if (
						this.currentMonth === new Date(Date.now()).getMonth() &&
						this.currentYear == new Date(Date.now()).getFullYear()
					) {
						const leftScroll = this.$refs[this.currentDay][0].offsetLeft
						this.$el.children[1].children[0].children[1].scrollLeft = leftScroll - window.innerWidth / 6
					} else {
						this.$el.children[1].children[0].children[1].scrollLeft = 0
					}
				}
			},
			daysInMonth() {
				this.countDays =
					32 -
					new Date(new Date(Date.now()).getFullYear(), new Date(Date.now()).getMonth(), 32).getDate()
			},
			correctTime(date) {
				let hours = new Date(date).getHours()
				let minutes = new Date(date).getMinutes()
				if (('' + hours).length < 2) hours = `0${hours}`
				if (('' + minutes).length < 2) minutes = `0${minutes}`
				return `${hours}:${minutes}`
			},
			selectSegment(id) {
				return this.bg[`${id}`]
			},
			loadData() {
				this.currentYear = this.$refs.date.value.split('-')[0]
				this.objectLoad = []
				for (let i = 0; i < this.countDays; i++) {
					const currentDay = i + 1
					this.objectLoad.push({
						day: currentDay,
						month: this.currentMonth,
						data: [],
						weekDay: this.dayName[new Date(this.currentYear, this.currentMonth, i + 1).getDay()],
					})

					this.activityData.forEach((activ) => {
						if (activ.start_time) {
							if (
								new Date(activ.start_time).getDate() == currentDay &&
								new Date(activ.start_time).getMonth() == this.currentMonth &&
								new Date(activ.start_time).getFullYear() == this.currentYear
							) {
								this.objectLoad[i].data.push(activ)
							}
						}
					})
					this.objectLoad[i].data.sort((a, b) => {
						return new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
					})
				}
			},
			addNewActivity(day, month, year) {
				this.modalACtivity = !this.modalACtivity
				this.modalDay = day
				this.modalMonth = month
				this.modalYear = year
			},
			trackActivityHandler() {
				this.modalTrackActivity = !this.modalTrackActivity
			},
			closeWindow() {
				this.modalACtivity = false
				this.modalTrackActivity = false
				this.changeActivity = false
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
				this.loadCards()
			},
			doneBg(done) {
				if (done) return 'doneBg'
			},
			addActivity(item) {
				console.log(this.activityData)
				const itemDay = new Date(item.startTime).getDate()
				this.activityData.push({
					seg: item.segment,
					desc: item.name,
					start_time: item.startTime,
					end_time: item.endTime,
					proj: item.project,
					tags: item.topic,
				})
				// this.objectLoad.forEach((listDay) => {
				// 	if (listDay.day == itemDay) {
				// 		listDay.data.push({
				// 			seg: item.segment,
				// 			desc: item.name,
				// 			start_time: item.startTime,
				// 			end_time: item.endTime,
				// 			proj: item.project,
				// 			tags: item.topic,
				// 		})
				// 		listDay.data.sort((a, b) => {
				// 			return new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
				// 		})
				// 	}
				// })
				this.loadCards()
			},
			handlerActivityModal(active) {
				console.log(active)
				this.changeActivity = true
				this.changeActivityComponent = active
			},
			endActivity(id) {
				this.activityData.forEach((item) => {
					if (item.id === id) {
						item.done = !item.done
					}
				})
				this.changeActivity = false
			},
			async deleteActivity(id) {
				const newActivities = this.activityData.filter((item) => {
					return item.id !== id
				})

				this.activityData = newActivities
				this.loadCards('put')
				this.changeActivity = false
			},
			changeItem(activ) {
				const currentTimeStart = activ.start_time.split(':')
				const currentTimeEnd = activ.end_time.split(':')
				this.activityData.forEach((item, id) => {
					if (item.id == activ.id) {
						const year = new Date(item.start_time).getFullYear()
						const month = new Date(item.start_time).getMonth()
						const day = new Date(item.start_time).getDate()
						console.log(new Date(year, month, day, currentTimeStart[0], currentTimeStart[1]))
						this.activityData[id].seg = activ.seg
						this.activityData[id].desc = activ.desc
						this.activityData[id].start_time = new Date(
							year,
							month,
							day,
							currentTimeStart[0],
							currentTimeStart[1],
						)
						this.activityData[id].end_time = new Date(
							year,
							month,
							day,
							currentTimeEnd[0],
							currentTimeEnd[1],
						)
						this.activityData[id].project = activ.proj
						this.activityData[id].topic = activ.tags
					}
				})
				this.loadCards('put')
			},
			bgCurrentDay(day) {
				if (
					day == new Date(Date.now()).getDate() &&
					this.currentMonth == new Date(Date.now()).getMonth() &&
					this.currentYear == new Date(Date.now()).getFullYear()
				) {
					return 'bg__currentday'
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	.activity {
		margin-left: 15.2%;
		height: calc(100vh - 40px);
		// background: linear-gradient(to right, rgba(96, 108, 136, 0.5), rgba(63, 76, 107, 0.5));
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
				margin-top: 20px;
			}
			&__cards {
				width: 100%;
				height: fit-content;
				min-height: 400px;
				// display: flex;
			}
			&__card {
				display: flex;
				flex-direction: column;
				/* margin: 15px; */
				min-width: 200px;
				/* border-radius: 3%; */
				border-left: 1px solid rgba(149, 226, 236, 0.5);
				border-right: 1px solid rgba(149, 226, 236, 0.5);
				margin: 0;
				margin: 3px;
				&__title {
					display: flex;
					justify-content: flex-start;
					margin-left: 5px;
					align-items: center;
					min-height: 30px;
					font-size: 1rem;
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
					flex-direction: column;

					&__item {
						position: relative;
						display: flex;
						margin: 10px;
						justify-content: space-between;
						height: fit-content;
						border-radius: 5px;
						min-height: 120px;
						cursor: pointer;
						&:hover {
							opacity: 0.8;
						}
					}
					&__info {
						display: flex;
						flex-direction: column;
						margin-left: 5px;
					}
					&__segment {
						display: flex;
						text-align: left;
						min-height: 50px;
					}
					&__name {
						display: flex;
						flex: 1 0 0;
					}
					&__time {
						display: flex;
					}
					&__state {
						margin: 8px;
						&__done {
							position: absolute;
							width: 100%;
							height: 1.5px;
							background: black;
							top: 50%;
							left: 0%;
							opacity: 1;
						}
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
	.bg__currentday {
		background: rgba(0, 0, 0, 0.1);
		font-weight: 500;
	}
	.doneBg {
		opacity: 0.4;
	}
	@media (max-width: 776px) {
		.activity {
			margin-left: 0% !important;
		}
	}
</style>
