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
						<b-form-input v-model="name"></b-form-input>
					</b-input-group>
					<b-input-group prepend="Segment" class="mt-3">
						<b-form-input v-model="segment"></b-form-input>
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
							<input type="time" style="margin: 10px;" v-model="startTime" @input="(e) => test(e)" id="" />
							<!-- <b-time id="ex-disabled-readonly" size="sm" @input="(e) => test(e)"></b-time> -->
						</div>

						<div class="d-flex" style="margin-left:5px">
							<p style="align-self: center;padding-top: 10px;">
								Finish:
							</p>
							<input v-model="endTime" type="time" style="margin: 10px;" @change="(e) => test(e)" id="" />
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
				name: '',
				segment: '',
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
			}
		},
		methods: {
			closeWindow(e) {
				if (e.target.className === 'modal-activity') {
					this.$emit('closeWindow')
				}
			},
			async addActivity() {
				const newActivity = {
					name: this.name,
					segment: this.segment,
					project: this.project,
					topic: this.topic,
					startTime: this.correctTime('start'),
					endTime: this.correctTime('end'),
				}
				Api.post('/activities', newActivity)
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
			},
			correctTime(type) {
				let time
				type === 'start' ? (time = this.startTime) : (time = this.endTime)
				return new Date(
					`${this.correctMonth[this.currentMonth]}.${this.currentDay}.${this.currentYear},${time}`,
				)
			},
		},
		computed: {},
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
</style>
