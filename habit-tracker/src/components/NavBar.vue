<template>
	<div>
		<div class="navbar navbar-expand-lg navbar-light bg-white">
			<div class="navbar__leftside" style="cursor:pointer" @click="mainHandler">
				Habit Tracker
			</div>
			<div class="navbar__rightside d-flex">
				<div>
					<DropDownMenu class="dropwond__menu" />
				</div>
				<div>
					<div class="navbar__rightside__avatar">
						<div @click="showProfileDropdawn = !showProfileDropdawn">
							<b-avatar alt="profile"></b-avatar>
						</div>
					</div>
					<div class="navbar__rightside__dropdawn" v-show="showProfileDropdawn">
						<div
							class="navbar__rightside__dropdawn__item"
							style="padding: 5px 8px 0 0;"
							@click="settingHandler"
						>
							<p>Профиль</p>
							<b-icon style="opacity:0.5" icon="gear-fill" aria-hidden="true" scale="1.2"></b-icon>
						</div>
						<div @click="logout" style="margin-bottom:10px" class="navbar__rightside__dropdawn__item">
							<p>Выход</p>
							<img style="max-width: 20px;opacity:0.5;" src="@/assets/img/logout.svg" alt="" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<SideBar />
	</div>
</template>

<script>
	import SideBar from '@/components/SideBar'
	import DropDownMenu from '@/components/DropDownMenu'

	export default {
		name: 'navBar',
		components: { SideBar, DropDownMenu },
		data() {
			return {
				showProfileDropdawn: false,
			}
		},
		methods: {
			mainHandler() {
				if (this.$router.history.current.name !== 'homePage') {
					this.$router.push({ name: 'homePage' })
				}
			},
			logout() {
				this.$store.dispatch('tokenModule/logoutUser')
				localStorage.removeItem('access_token')
				deleteCookie('jwtRefresh')
				this.$router.push({ name: 'signInPage' })
			},
			settingHandler() {
				if (this.$router.history.current.path !== '/setting') this.$router.push({ path: '/setting' })
			},
		},
	}
</script>

<style lang="scss" scoped>
	.navbar {
		width: 100%;
		height: 40px;
		&__leftside {
			margin-left: 20px;
		}
		&__rightside {
			position: absolute;
			right: 0;
			margin-right: 20px;
			&__avatar {
				cursor: pointer;
			}
			&__dropdawn {
				height: 80px;
				background-color: #fff;
				position: absolute;
				right: 10px;
				top: 35px;
				z-index: 1;
				width: 100px;
				border-radius: 3px;
				box-shadow: 0 0 1px rgb(0 0 0 / 50%);
				&__item {
					display: flex;
					justify-content: space-between;
					cursor: pointer;
					padding: 2px;
					max-height: 40px;
				}
				&__item:hover {
					background-color: rgb(244, 245, 247);
					text-decoration: none;
				}
			}
		}
	}
	.navbar::after {
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
	.dropwond__menu {
		display: none;
	}

	@media (max-width: 776px) {
		.dropwond__menu {
			display: block;
		}
	}
</style>
