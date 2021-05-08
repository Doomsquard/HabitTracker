<template>
	<div>
		<div class="navbar navbar-expand-lg navbar-light bg-white">
			<div class="navbar__leftside">
				Habit Tracker
			</div>
			<div class="navbar__rightside">
				<div class="navbar__rightside__avatar">
					<!-- <b-dropdown toggle-class="text-decoration-none p-0" no-caret>
						<template #button-content></template>
						<b-dropdown-item href="#">A</b-dropdown-item>
						<b-dropdown-item href="#">A</b-dropdown-item>
						<b-dropdown-item href="#">S</b-dropdown-item>
					</b-dropdown> -->
					<div @click="showProfileDropdawn = !showProfileDropdawn">
						<b-avatar alt="profile"></b-avatar>
					</div>
				</div>
				<div class="navbar__rightside__dropdawn" v-show="showProfileDropdawn">
					<div class="navbar__rightside__dropdawn__item" style="padding: 5px 8px 0 0;">
						<p>Settings</p>
						<b-icon style="opacity:0.5" icon="gear-fill" aria-hidden="true" scale="1.2"></b-icon>
					</div>
					<div style="margin-bottom:10px" class="navbar__rightside__dropdawn__item">
						<p>Log out</p>
						<img style="max-width: 20px;opacity:0.5;" src="@/assets/img/logout.svg" alt="" />
					</div>
				</div>
			</div>
		</div>
		<aside class="aside">aside</aside>
	</div>
</template>

<script>
	export default {
		name: 'navBar',
		data() {
			return {
				showProfileDropdawn: false,
			}
		},
		methods: {},
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
	.aside {
		position: absolute;
		width: 15%;
		height: calc(100vh - 40px);
		border-right: 1px solid lightgrey;
		overflow-y: hidden;
		min-width: 100px;
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
