<template>
	<div>
		<router-view />
		<div class="main">START</div>
	</div>
</template>

<script>
	export default {
		name: 'StartComponent',
	}
</script>

//
<style lang="scss" scoped>
	.main {
		margin-left: 15%;
		height: calc(100vh - 50px);
	}
</style>
