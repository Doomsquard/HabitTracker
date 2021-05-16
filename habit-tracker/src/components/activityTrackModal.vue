<template>
	<div class="modal-activity" @click="(e) => closeWindow(e)">
		<div class="modal-activity__wrapper">
			<div class="modal-activity__window">
				<div class="modal-activity__window__header">
					<div>
						<span class="time" style="font-size:1.6rem">{{ time }}</span>
					</div>
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

					<div>
						<b-button class="create-button" v-if="!running" @click="start">Start</b-button>
						<b-button class="create-button" v-else @click="stop">Pause</b-button>
						<b-button class="create-button">Done</b-button>
						<b-button class="create-button">Undo</b-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ActivityTrackModal',
		data() {
			return {
				time: '00:00:00.000',
				timeBegan: null,
				timeStopped: null,
				stoppedDuration: 0,
				started: null,
				running: false,
			}
		},
		methods: {
			closeWindow(e) {
				if (e.target.className === 'modal-activity') {
					this.$emit('closeWindow')
				}
			},
			test(e) {
				console.log(e.target.value)
			},
			zeroPrefix(num, digit) {
				var zero = ''
				for (var i = 0; i < digit; i++) {
					zero += '0'
				}
				return (zero + num).slice(-digit)
			},
			clockRunning() {
				const currentTime = new Date(),
					timeElapsed = new Date(currentTime - this.timeBegan - this.stoppedDuration),
					hour = timeElapsed.getUTCHours(),
					min = timeElapsed.getUTCMinutes(),
					sec = timeElapsed.getUTCSeconds(),
					ms = timeElapsed.getUTCMilliseconds()

				this.time =
					this.zeroPrefix(hour, 2) +
					':' +
					this.zeroPrefix(min, 2) +
					':' +
					this.zeroPrefix(sec, 2) +
					'.' +
					this.zeroPrefix(ms, 3)
			},
			stop() {
				this.running = false
				this.timeStopped = new Date()
				clearInterval(this.started)
			},
			start() {
				if (this.running) return

				if (this.timeBegan === null) {
					this.timeBegan = new Date()
				}

				if (this.timeStopped !== null) {
					this.stoppedDuration += new Date() - this.timeStopped
				}

				this.started = setInterval(this.clockRunning, 10)
				this.running = true
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
		margin: 5px;
		&:hover {
			background: #147581;
		}
	}
</style>
