<template>
	<div>
		<router-view />
		<h1 class="main"><b-alert show>content</b-alert></h1>
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
