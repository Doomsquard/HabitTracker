<template>
	<div class="modal-activity" @click="(e) => closeWindow(e)">
		<div class="modal-activity__wrapper">
			<div class="modal-activity__window">
				<div class="modal-activity__window__header">
					<div>
						Новая активность
					</div>
					<div>{{ currentDay }} {{ currentMonth }}</div>
				</div>
				<div class="modal-activity__window__main">
					<b-input-group prepend="Name" class="mt-3">
						<b-form-input
							v-model="name"
							:class="errorActiveName"
							@change="errorName = false"
						></b-form-input>
					</b-input-group>
					<b-input-group prepend="Segment" class="mt-3">
						<b-form-select
							v-model="selectedSegment"
							:options="optionsSegment"
							:class="['segment', errorActiveSegment]"
							@change="errorSegment = false"
						>
							<template #first>
								<b-form-select-option :value="null" disabled>Выберите сегмент</b-form-select-option>
							</template>
						</b-form-select>
					</b-input-group>
					<b-input-group prepend="Project" class="mt-3">
						<b-form-input v-model="project"></b-form-input>
					</b-input-group>
					<b-input-group prepend="Topic" class="mt-3">
						<b-form-input v-model="topic"></b-form-input>
					</b-input-group>
					<div style="padding-top:20px;justify-content: center;align-items: center;" class="d-flex">
						<div class="d-flex">
							<p style="align-self: center;padding-top: 10px;">
								Start:
							</p>
							<input
								type="time"
								style="margin: 10px;"
								:class="errorActiveStart"
								v-model="startTime"
								@change="errorStartTime = false"
							/>
							<!-- <b-time id="ex-disabled-readonly" size="sm" @input="(e) => test(e)"></b-time> -->
						</div>

						<div class="d-flex" style="margin-left:5px">
							<p style="align-self: center;padding-top: 10px;">
								Finish:
							</p>
							<input
								v-model="endTime"
								type="time"
								:class="errorActiveEnd"
								style="margin: 10px;"
								id=""
								@change="errorEndTime = false"
							/>
							<!-- <b-time id="ex-disabled-readonly" size="sm" @input="(e) => test(e)"></b-time> -->
						</div>
					</div>
					<div>
						<b-button class="create-button" @click="addActivity">Создать</b-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Api from '../api/api'

	export default {
		name: 'activitiModal',
		props: ['currentDay', 'currentMonth', 'currentYear'],
		data() {
			return {
				selectedSegment: null,
				optionsSegment: [
					{ value: '1', text: 'Творчество' },
					{ value: '2', text: 'Здоровье и спорт' },
					{ value: '3', text: 'Саморазвитие' },
					{ value: '4', text: 'Деньги' },
					{ value: '5', text: 'Друзья и окружение' },
					{ value: '6', text: 'Семья и отношения' },
					{ value: '7', text: 'Карьера' },
					{ value: '8', text: 'Впечатления' },
				],
				name: '',
				project: '',
				topic: '',
				startTime: '',
				endTime: '',
				correctMonth: {
					Января: 1,
					Февраля: 2,
					Марта: 3,
					Апреля: 4,
					Мая: 5,
					Июня: 6,
					Июля: 7,
					Августа: 8,
					Сентября: 9,
					Октября: 10,
					Ноября: 11,
					Декабря: 12,
				},
				errorName: false,
				errorSegment: false,
				errorStartTime: false,
				errorEndTime: false,
			}
		},
		methods: {
			closeWindow(e) {
				if (e.target.className === 'modal-activity') {
					this.$emit('closeWindow')
				}
			},
			async addActivity() {
				if (this.checkFields()) {
					const newActivity = {
						name: this.name,
						segment: this.selectedSegment,
						project: this.project,
						topic: this.topic,
						startTime: this.correctTime('start'),
						endTime: this.correctTime('end'),
					}
					await Api.post('/activities', newActivity)
						.then(() => {
							this.$emit('closeWindow')
							this.$emit('addActivity', newActivity)
						})
						.catch(() => {
							this.$store.dispatch('tokenModule/checkToken').then(() => {
								Api.post('/activities', newActivity).then(() => {
									this.$emit('closeWindow')
									this.$emit('addActivity', newActivity)
								})
							})
						})
				}
			},
			checkFields() {
				this.name ? (this.errorName = false) : (this.errorName = true)
				this.selectedSegment ? (this.errorSegment = false) : (this.errorSegment = true)
				this.startTime ? (this.errorStartTime = false) : (this.errorStartTime = true)
				this.endTime ? (this.errorEndTime = false) : (this.errorEndTime = true)
				if (!this.errorName && !this.errorSegment && !this.errorStartTime && !this.errorEndTime) {
					return true
				} else {
					return false
				}
			},
			correctTime(type) {
				let time
				type === 'start' ? (time = this.startTime) : (time = this.endTime)
				return new Date(
					`${this.correctMonth[this.currentMonth]}.${this.currentDay}.${this.currentYear},${time}`,
				)
			},
		},
		computed: {
			errorActiveName() {
				return this.errorName ? 'errorActive' : null
			},
			errorActiveSegment() {
				return this.errorSegment ? 'errorActive' : null
			},
			errorActiveStart() {
				return this.errorStartTime ? 'errorActive' : null
			},
			errorActiveEnd() {
				return this.errorEndTime ? 'errorActive' : null
			},
		},
	}
</script>

<style lang="scss" scoped>
	.modal-activity {
		&:before {
			content: '';
			background: #000;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			opacity: 0.7;
			z-index: 9999;
		}
		&__wrapper {
			position: fixed;
			top: 20%;
			left: 50%;
			width: 350px;
			height: fit-content;
			margin-left: -200px;
			background: #fff;
			border-radius: 4px;
			z-index: 99999;
			opacity: 1;
		}
		&__window {
			display: flex;
			height: 100%;
			flex-direction: column;
			&__header {
				display: flex;
				justify-content: space-around;
				min-height: 30px;
				border-bottom: 1.5px solid #95e2ec;
			}
			&__main {
				flex: 1 0 0;
				padding: 10px;
			}
		}
	}
	.input-group-text {
		width: 100px;
		height: inherit;
	}
	.input-group {
		height: 30px;
	}
	.input-group-prepend {
		height: inherit;
	}
	.form-control {
		height: inherit;
		&:focus {
			box-shadow: 0 0 0 0.1rem rgb(13 110 253 / 25%);
		}
	}
	.b-time {
		min-width: 100px;
	}
	.create-button {
		background: #95e2ec;
		border: none;
		margin-top: 5px;
		&:hover {
			background: #147581;
		}
	}
	.segment {
		position: relative;
		flex: 1 1 auto;
		width: 1%;
		min-width: 0;
		border: 1px solid #ced4da;
		/* -webkit-appearance: none; */
		-moz-appearance: none;
		/* appearance: none; */
		border-radius: 0.25rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		font-size: 0.9rem;
		padding-left: 8px;
	}
	.errorActive {
		border: 1px solid rgb(253, 51, 51);
	}
	@media (max-width: 767px) {
		.modal-activity__wrapper {
			margin-left: -150px;
			width: 300px;
		}
	}
</style>
