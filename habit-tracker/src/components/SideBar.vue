<template>
	<aside class="aside">
		<div class="aside__nav">
			<div @click="activeHandler('activityPage')" :class="['aside__nav__item', activityActive]">
				<img class="aside__nav__item__img" src="@/assets/img/activity.svg" alt="activity" />
				<p class="aside__nav__item__title">Activity</p>
			</div>
			<div :class="['aside__nav__item', activityHabits]" @click="activeHandler('habitPage')">
				<img class="aside__nav__item__img" src="@/assets/img/habits.svg" alt="habits" />
				<p class="aside__nav__item__title">Habits</p>
			</div>
			<div :class="['aside__nav__item', activityStats]" @click="activeHandler('statsPage')">
				<img class="aside__nav__item__img" src="@/assets/img/stats.svg" alt="stats" />
				<p class="aside__nav__item__title">Statistics</p>
			</div>
			<div :class="['aside__nav__item', activityMenu]" @click="activeHandler('menuPage')">
				<img class="aside__nav__item__img" src="@/assets/img/menu.svg" alt="menu" />
				<p class="aside__nav__item__title">Menu</p>
			</div>
		</div>
	</aside>
</template>

<script>
	export default {
		name: 'sideBar',
		data() {
			return {
				currentLocation: null,
			}
		},
		mounted() {
			this.currentLocation = this.$router.history.current.name
		},
		methods: {
			activeHandler(page) {
				if (this.$router.history.current.name !== page) {
					this.$router.push({ name: page })
					this.currentLocation = this.$router.history.current.name
				}
			},
		},
		computed: {
			activityActive() {
				return this.currentLocation === 'activityPage' ? 'activeTab' : ''
			},
			activityStats() {
				return this.currentLocation === 'statsPage' ? 'activeTab' : ''
			},
			activityMenu() {
				return this.currentLocation === 'menuPage' ? 'activeTab' : ''
			},
			activityHabits() {
				return this.currentLocation === 'habitPage' ? 'activeTab' : ''
			},
		},
	}
</script>

<style lang="scss" scoped>
	.aside {
		position: absolute;
		width: 15%;
		height: calc(100vh - 40px);
		border-right: 1px solid lightgrey;
		overflow-y: hidden;
		min-width: 100px;
		&__nav {
			display: flex;
			justify-content: center;
			flex-direction: column;
			margin-top: 30px;
			&__item {
				display: flex;
				align-items: center;
				padding: 10px;
				display: flex;
				cursor: pointer;
				&:hover {
					background-color: rgb(244, 245, 247);
					text-decoration: none;
				}
				&__title {
					margin: 0px 0px 0 20px;
				}
				&__img {
					width: 22px;
					opacity: 0.7;
				}
			}
		}
	}
	.aside::after {
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
	.activeTab {
		background-color: rgb(149, 226, 236);
		&:hover {
			background-color: rgb(149, 226, 236);
		}
	}
</style>
