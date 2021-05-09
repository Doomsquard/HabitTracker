<template>
	<div>
		<router-view />
		<div class="activity">activity</div>
	</div>
</template>

<script>
	export default {
		name: 'ActivityComponent',
	}
</script>

<style lang="scss" scoped>
	.activity {
		margin-left: 15%;
		height: calc(100vh - 50px);
	}
</style>
