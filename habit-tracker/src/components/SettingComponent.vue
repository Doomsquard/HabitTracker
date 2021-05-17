<template>
	<div>
		<router-view />
		<div class="setting">
			<loader v-if="loading" />
			<div v-else class="setting__wrapper">
				<main style="margin:10px">
					<!-- <div>login: {{ user.login }}</div>
					<div>email: {{ user.email }}</div>
					<div>firstname: {{ user.firstname }}</div>
					<div>lastname: {{ user.lastname }}</div>
					<div>age: {{ ageHandler }}</div> -->
					<div class="row">
						<div class="order-xl-2 mb-5 col-xl-4">
							<div alt="Image placeholder" class="card card-profile">
								<!----><!---->
								<div class="row justify-content-center">
									<div class="order-lg-2 col-lg-3">
										<div class="card-profile-image">
											<a href="#"
												><img
													src="@/assets/img/profile.png"
													style="height:100px"
													class="rounded-circle background-none"
											/></a>
										</div>
									</div>
								</div>

								<div class="card-body pt-0">
									<!----><!---->

									<div class="text-center">
										<h5 class="h3">
											{{ user.firstname || 'First name' }} {{ user.lastname || 'Last name'
											}}<span class="font-weight-light">, {{ ageHandler }}</span>
										</h5>
									</div>
								</div>
								<!----><!---->
							</div>
						</div>
						<div class="order-xl-1 col-xl-8">
							<div class="card">
								<!----><!---->
								<div class="card-header">
									<div class="row align-items-center">
										<div class="col-8"><h5 class="mb-0">Изменить профиль</h5></div>
										<div class="text-right col-4">
											<button
												class="btn btn-sm btn-primary"
												style="background-color: #95e2ec;border:none;"
												v-if="!changeProfile"
												@click="changeProfileHandler"
											>
												Изменить
											</button>
											<button
												class="btn btn-sm btn-primary"
												style="background-color: #95e2ec;border:none;"
												v-else
												@click="saveProfileHandler"
											>
												Сохранить
											</button>
										</div>
									</div>
								</div>
								<div class="card-body">
									<!----><!---->
									<form class="">
										<h6 class="heading-small text-muted mb-4">Информация о пользователе</h6>
										<div class="pl-lg-4">
											<div class="row">
												<div class="col-lg-6">
													<span placeholder="Username"
														><fieldset class="form-group" id="__BVID__309">
															<!---->
															<div tabindex="-1" role="group" class="bv-no-focus-ring">
																<label class="form-control-label">
																	Логин пользователя
																</label>
																<div class="has-label">
																	<!----><input
																		type="text"
																		:placeholder="user.login"
																		class="form-control"
																		valid="true"
																		disabled
																	/><!---->
																</div>
																<!----><!----><!----><!----><!---->
															</div>
														</fieldset></span
													>
												</div>
												<div class="col-lg-6">
													<span :placeholder="user.login"
														><fieldset class="form-group" id="__BVID__312">
															<!---->
															<div tabindex="-1" role="group" class="bv-no-focus-ring">
																<label class="form-control-label">
																	Email
																</label>
																<div class="has-label">
																	<!----><input
																		type="email"
																		:placeholder="user.email"
																		class="form-control"
																		valid="true"
																		disabled
																	/><!---->
																</div>
																<!----><!----><!----><!----><!---->
															</div>
														</fieldset></span
													>
												</div>
											</div>
											<div class="row">
												<div class="col-lg-6">
													<span placeholder="First Name"
														><fieldset class="form-group" id="__BVID__315">
															<!---->
															<div tabindex="-1" role="group" class="bv-no-focus-ring">
																<label class="form-control-label">
																	Имя
																</label>
																<div class="has-label">
																	<!----><input
																		type="text"
																		:placeholder="user.firstname || 'First Name'"
																		class="form-control"
																		valid="true"
																		:value="user.firstname"
																		:disabled="!changeProfile"
																		ref="firstname"
																	/><!---->
																</div>
																<!----><!----><!----><!----><!---->
															</div>
														</fieldset></span
													>
												</div>
												<div class="col-lg-6">
													<span placeholder="Last Name"
														><fieldset class="form-group" id="__BVID__318">
															<!---->
															<div tabindex="-1" role="group" class="bv-no-focus-ring">
																<label class="form-control-label">
																	Фамилия
																</label>
																<div class="has-label">
																	<!----><input
																		type="text"
																		:placeholder="user.lastname || 'Last Name'"
																		class="form-control"
																		valid="true"
																		:value="user.lastname"
																		:disabled="!changeProfile"
																		ref="lastname"
																	/><!---->
																</div>
																<!----><!----><!----><!----><!---->
															</div>
														</fieldset></span
													>
												</div>
											</div>
										</div>
										<hr class="my-4" />
									</form>
								</div>
								<!----><!----><!----><!---->
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	</div>
</template>

<script>
	import loader from '@/components/loader.vue'
	import Api from '@/api/api'

	export default {
		name: 'SettingComponent',
		components: { loader },
		data() {
			return {
				user: {
					birthday: '',
					datereg: '',
					email: '',
					firstname: '',
					lastname: '',
					login: '',
				},
				changeProfile: false,
				loading: false,
			}
		},
		async mounted() {
			this.loading = true
			await this.$store.dispatch('userModule/getProfileData')
			const currentUser = this.$store.getters['userModule/checkUser'].data.user
			this.user = currentUser
			this.loading = false
		},
		methods: {
			changeProfileHandler() {
				this.changeProfile = true
			},
			async saveProfileHandler() {
				const setFirstname = this.$refs.firstname.value
				const setLastname = this.$refs.lastname.value
				this.user.firstname = setFirstname
				this.user.lastname = setLastname
				Api.put('/profile', { firstname: setFirstname, lastname: setLastname }).then((data) => {
					this.changeProfile = false
					console.log(data)
				})
			},
		},
		computed: {
			ageHandler() {
				function calculate_age(birth_month, birth_day, birth_year) {
					const today_date = new Date()
					const today_year = today_date.getFullYear()
					const today_month = today_date.getMonth()
					const today_day = today_date.getDate()
					let age = today_year - birth_year
					if (today_month < birth_month - 1) {
						age--
					}
					if (birth_month - 1 == today_month && today_day < birth_day) {
						age--
					}
					return age
				}
				this.birthday = new Date(this.user.birthday)
				return calculate_age(
					new Date(this.birthday.getMonth()),
					new Date(this.birthday.getDate()),
					new Date(this.birthday.getFullYear()),
				)
			},
			changeButton() {},
		},
	}
</script>

<style lang="scss" scoped>
	.setting {
		margin-left: 15%;
		height: calc(100vh - 50px);
	}
</style>
