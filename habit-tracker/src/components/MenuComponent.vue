<template>
	<div>
		<router-view />
		<div class="menu">menu</div>
	</div>
</template>

<script>
	export default {
		name: 'MenuComponent',
	}
</script>

<style lang="scss" scoped>
	.menu {
		margin-left: 15%;
		height: calc(100vh - 50px);
	}
</style>
