<template>
	<b-dropdown size="" variant="link" toggle-class="text-decoration-none" no-caret>
		<template #button-content
			><img src="../assets/img/menu.svg" width="17px" /><span class="sr-only"></span>
		</template>
		<b-dropdown-item href="#" @click="activeHandler('activityPage')"
			><div :class="['aside__nav__item', activityActive]">
				<img class="aside__nav__item__img" src="@/assets/img/activity.svg" alt="activity" />
				<p class="aside__nav__item__title">Активность</p>
			</div></b-dropdown-item
		>
		<b-dropdown-item href="#" @click="activeHandler('habitPage')"
			><div :class="['aside__nav__item', activityHabits]">
				<img class="aside__nav__item__img" src="@/assets/img/habits.svg" alt="habits" />
				<p class="aside__nav__item__title">Привычки</p>
			</div></b-dropdown-item
		>
		<b-dropdown-item href="#" @click="activeHandler('statsPage')"
			><div :class="['aside__nav__item', activityStats]">
				<img class="aside__nav__item__img" src="@/assets/img/stats.svg" alt="stats" />
				<p class="aside__nav__item__title">Статистика</p>
			</div></b-dropdown-item
		>
		<b-dropdown-item @click="activeHandler('balancePage')" href="#"
			><div :class="['aside__nav__item', activityMenu]">
				<img class="aside__nav__item__img" src="@/assets/img/wheel.svg" alt="Balance" />
				<p class="aside__nav__item__title" style="white-space: nowrap;">Колесо баланса</p>
			</div></b-dropdown-item
		>
	</b-dropdown>
</template>

<script>
	export default {
		name: 'DropDownMenu',
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
				return this.currentLocation === 'balancePage' ? 'activeTab' : ''
			},
			activityHabits() {
				return this.currentLocation === 'habitPage' ? 'activeTab' : ''
			},
		},
	}
</script>

<style lang="scss">
	.dropdown-menu {
		left: -100px;
	}
	.aside {
		position: absolute;
		width: 15%;
		height: calc(100vh - 40px);
		border-right: 1px solid lightgrey;
		overflow-y: hidden;
		min-width: 180px;
		z-index: 5;
		background-color: #fff;
		margin-top: 2px;
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
</style>
