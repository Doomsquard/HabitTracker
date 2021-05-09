<template>
	<div>
		<router-view />
		<div class="habit">habit</div>
	</div>
</template>

<script>
	export default {
		name: 'HabitComponent',
	}
</script>

<style lang="scss" scoped>
	.habit {
		margin-left: 15%;
		height: calc(100vh - 50px);
	}
</style>
