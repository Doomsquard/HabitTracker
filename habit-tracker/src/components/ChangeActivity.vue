<template>
	<div class="modal-activity" @click="(e) => closeWindow(e)">
		<div class="modal-activity__wrapper">
			<div class="modal-activity__window">
				<div class="modal-activity__window__header">
					<div class="mt-1">
						Активность
					</div>
				</div>
				<div class="modal-activity__window__main">
					<b-input-group prepend="Name" class="mt-3">
						<b-form-input
							v-model="desc"
							:placeholder="desc"
							v-if="putActive"
							:class="errorActiveName"
							@change="errorDesc = false"
						></b-form-input>
						<b-form-input v-model="desc" :placeholder="desc" v-else disabled></b-form-input>
					</b-input-group>
					<b-input-group prepend="Segment" class="mt-3">
						<b-form-select
							v-model="seg"
							:options="optionsSeg"
							:class="['segment', errorActiveSegment]"
							@change="errorSeg = false"
							v-if="putActive"
						>
							<template #first>
								<b-form-select-option :value="null" disabled>Выберите сегмент</b-form-select-option>
							</template>
						</b-form-select>
						<b-form-select
							v-model="seg"
							:options="optionsSeg"
							:class="['segment', errorActiveSegment]"
							@change="errorSeg = false"
							v-else
							disabled
						>
							<template #first>
								<b-form-select-option :value="null" disabled>Выберите сегмент</b-form-select-option>
							</template>
						</b-form-select>
					</b-input-group>
					<b-input-group prepend="Project" class="mt-3">
						<b-form-input v-model="proj" :placeholder="proj" v-if="putActive"></b-form-input>
						<b-form-input v-model="proj" :placeholder="proj" v-else disabled></b-form-input>
					</b-input-group>
					<b-input-group prepend="Topic" class="mt-3">
						<b-form-input v-model="tags" :placeholder="tags" v-if="putActive"></b-form-input>
						<b-form-input v-model="tags" :placeholder="tags" v-else disabled></b-form-input>
					</b-input-group>
					<div style="padding-top:20px;justify-content: center;align-items: center;" class="d-flex">
						<div class="d-flex">
							<p style="align-self: center;padding-top: 10px;">
								Start:
							</p>
							<input
								type="time"
								style="margin: 10px;"
								v-model="start_time"
								:placeholder="new Date(start_time).getTime()"
								v-if="putActive"
								:class="errorActiveStart"
							/>
							<input
								v-else
								type="time"
								style="margin: 10px;"
								v-model="start_time"
								:placeholder="new Date(start_time).getTime()"
								disabled
							/>
							<!-- <b-time id="ex-disabled-readonly" size="sm" @input="(e) => test(e)"></b-time> -->
						</div>

						<div class="d-flex" style="margin-left:5px">
							<p style="align-self: center;padding-top: 10px;">
								Finish:
							</p>
							<input
								v-model="end_time"
								type="time"
								style="margin: 10px;"
								id=""
								:placeholder="new Date(end_time).getTime()"
								v-if="putActive"
								:class="errorActiveEnd"
							/>
							<input
								v-else
								v-model="end_time"
								type="time"
								style="margin: 10px;"
								id=""
								:placeholder="new Date(end_time).getTime()"
								disabled
							/>
							<!-- <b-time id="ex-disabled-readonly" size="sm" @input="(e) => test(e)"></b-time> -->
						</div>
					</div>
					<div
						style="display: flex;
    justify-content: space-between;"
						class="change-buttons"
					>
						<b-button class="create-button-end" @click="endActivity(id)">{{ checkDone }}</b-button>
						<b-button class="create-button-put" @click="putActivity">{{ checkPut }}</b-button>
						<b-button class="create-button-delete" @click="deleteActivity">Удалить</b-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Api from '@/api/api'

	export default {
		name: 'ChangeActivity',
		props: ['active'],
		data() {
			return {
				optionsSeg: [
					{ value: '1', text: 'Творчество' },
					{ value: '2', text: 'Здоровье и спорт' },
					{ value: '3', text: 'Саморазвитие' },
					{ value: '4', text: 'Деньги' },
					{ value: '5', text: 'Друзья и окружение' },
					{ value: '6', text: 'Семья и отношения' },
					{ value: '7', text: 'Карьера' },
					{ value: '8', text: 'Впечатления' },
				],
				id: '',
				desc: '',
				seg: '',
				proj: '',
				done: false,
				tags: '',
				start_time: '',
				end_time: '',
				putActive: false,
				errorDesc: false,
				errorSeg: false,
				errorStartTime: false,
				errorEndTime: false,
			}
		},
		mounted() {
			this.id = this.active.id
			this.desc = this.active.desc
			this.seg = this.active.seg
			this.proj = this.active.proj
			this.tags = this.active.tags
			this.done = this.active.done
			this.start_time = this.correctTime(this.active.start_time)
			this.end_time = this.correctTime(this.active.end_time)
		},
		methods: {
			async putActivity() {
				if (this.checkFields()) {
					const changeValues = {
						id: this.id,
						type: 'change',
						desc: this.desc,
						seg: this.seg,
						proj: this.proj,
						tags: this.tags,
						done: this.done,
						start_time: this.start_time,
						end_time: this.end_time,
					}
					if (
						this.id !== this.active.id ||
						this.desc !== this.active.desc ||
						this.seg !== this.active.seg ||
						this.proj !== this.active.proj ||
						this.tags !== this.active.tags ||
						this.done !== this.active.done ||
						this.start_time !== this.correctTime(this.active.start_time) ||
						this.end_time !== this.correctTime(this.active.end_time)
					) {
						await Api.put(`/activities/${this.id}`, changeValues).catch(() => {
							this.$store.dispatch('tokenModule/checkToken').then(() => {
								Api.put(`/activities/${this.id}`, changeValues)
							})
						})
					}
					console.log(this.checkFields())
					if (this.putActive) {
						this.putActive = true
					} else if (!this.putActive && this.checkFields()) {
						this.checkFields()
					} else {
						this.putActive = false
					}
					this.putActive = !this.putActive
					this.$emit('changeItem', changeValues)
				}
			},
			checkFields() {
				this.desc ? (this.errorDesc = false) : (this.errorDesc = true)
				this.seg ? (this.errorSeg = false) : (this.errorSeg = true)
				this.start_time ? (this.errorStartTime = false) : (this.errorStartTime = true)
				this.end_time ? (this.errorEndTime = false) : (this.errorEndTime = true)
				if (!this.errorDesc && !this.errorSeg && !this.errorStartTime && !this.errorEndTime) {
					return true
				} else {
					return false
				}
			},
			async endActivity(id) {
				console.log(id)
				await Api.put(`/activities/${this.id}`, { id, type: 'end', active: !this.done }).catch(() => {
					this.$store.dispatch('tokenModule/checkToken').then(() => {
						Api.put(`/activities/${this.id}`, { id, type: 'end', active: !this.done })
					})
				})
				this.$emit('endActivity', id)
			},
			async deleteActivity() {
				await Api.delete(`/activities/${this.id}`).catch(() => {
					this.$store.dispatch('tokenModule/checkToken').then(() => {
						Api.delete(`/activities/${this.id}`)
					})
				})
				this.$emit('deleteActivity', this.id)
			},
			closeWindow(e) {
				if (e.target.className === 'modal-activity') {
					this.$emit('closeWindow')
				}
			},
			correctTime(time) {
				let minutes = new Date(time).getMinutes()
				let hours = new Date(time).getHours()
				if (('' + minutes).length < 2) minutes = `0${'' + minutes}`
				if (('' + hours).length < 2) hours = `0${'' + hours}`
				return `${hours}:${minutes}`
			},
		},
		computed: {
			checkDone() {
				return this.done ? 'Возобновить' : 'Завершить'
			},
			checkPut() {
				return this.putActive ? 'Сохранить' : 'Редактировать'
			},
			errorActiveName() {
				return this.errorDesc ? 'errorActive' : null
			},
			errorActiveSegment() {
				return this.errorSeg ? 'errorActive' : null
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
	.create-button-end {
		background: #95ecb9;
		border: none;
		margin-top: 5px;
		max-width: 110px;
		justify-content: center;
		display: flex;
		margin-right: 3px;
		&:hover {
			background: #6d6d6d;
		}
	}
	.create-button-put {
		background: #95d8ec;
		border: none;
		margin-top: 5px;
		max-width: 110px;
		justify-content: center;
		display: flex;
		margin-right: 3px;
		&:hover {
			background: #6d6d6d;
		}
	}
	.create-button-delete {
		background: #ec9595;
		border: none;
		margin-top: 5px;
		max-width: 110px;
		justify-content: center;
		display: flex;
		margin-right: 3px;
		&:hover {
			background: #6d6d6d;
		}
	}
	.errorActive {
		border: 1px solid rgb(253, 51, 51);
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
	@media (max-width: 767px) {
		.modal-activity__wrapper {
			margin-left: -150px;
			width: 300px;
		}
		.change-buttons {
			display: flex;
			flex-direction: column;
		}
		.create-button-end {
			max-width: none;
		}
		.create-button-put {
			max-width: none;
		}
		.create-button-delete {
			max-width: none;
		}
	}
</style>
