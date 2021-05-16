<template>
	<div class="modal-activity" @click="(e) => closeWindow(e)">
		<div class="modal-activity__wrapper">
			<div class="modal-activity__window">
				<div class="modal-activity__window__header">
					<div>
						New Activity
					</div>
					<div>{{ currentDay }} {{ currentMonth }}</div>
				</div>
				<div class="modal-activity__window__main">
					<b-input-group prepend="Name" class="mt-3">
						<b-form-input></b-form-input>
					</b-input-group>
					<b-input-group prepend="Segment" class="mt-3">
						<b-form-input></b-form-input>
					</b-input-group>
					<b-input-group prepend="Progect" class="mt-3">
						<b-form-input></b-form-input>
					</b-input-group>
					<b-input-group prepend="Topic" class="mt-3">
						<b-form-input></b-form-input>
					</b-input-group>
					<div style="padding-top:20px;justify-content: center;align-items: center;" class="d-flex">
						<div class="d-flex">
							<p style="align-self: center;padding-top: 10px;">
								Start:
							</p>
							<input type="time" style="margin: 10px;" @input="(e) => test(e)" id="" />
							<!-- <b-time id="ex-disabled-readonly" size="sm" @input="(e) => test(e)"></b-time> -->
						</div>

						<div class="d-flex" style="margin-left:5px">
							<p style="align-self: center;padding-top: 10px;">
								Finish:
							</p>
							<input type="time" style="margin: 10px;" @change="(e) => test(e)" id="" />
							<!-- <b-time id="ex-disabled-readonly" size="sm" @input="(e) => test(e)"></b-time> -->
						</div>
					</div>
					<div>
						<b-button class="create-button">Create</b-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'activitiModal',
		props: ['currentDay', 'currentMonth'],
		methods: {
			closeWindow(e) {
				if (e.target.className === 'modal-activity') {
					this.$emit('closeWindow')
				}
			},
			test(e) {
				console.log(e.target.value)
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
</style>
