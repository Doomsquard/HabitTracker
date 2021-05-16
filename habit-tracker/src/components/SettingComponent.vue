<template>
	<div>
		<router-view />
		<div class="setting">
			<loader />
		</div>
	</div>
</template>

<script>
	import loader from '@/components/loader.vue'

	export default {
		name: 'SettingComponent',
		components: { loader },
		data() {
			return {
				user: null,
			}
		},
		mounted() {
			this.$store.dispatch('userModule/getProfileData')
		},
	}
</script>

<style lang="scss" scoped>
	.setting {
		margin-left: 15%;
		height: calc(100vh - 50px);
	}
</style>
