<template>
	<div>
		<router-view />
		<div class="stats">stats</div>
	</div>
</template>

<script>
	export default {
		name: 'StatsComponent',
	}
</script>

<style lang="scss" scoped>
	.stats {
		margin-left: 15%;
		height: calc(100vh - 50px);
	}
</style>
