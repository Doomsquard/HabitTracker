<template>
	<div>
		<StartComponent />
	</div>
</template>

<script>
	// @ is an alias to /src
	import StartComponent from '@/components/StartComponent.vue'

	export default {
		name: 'Home',
		components: {
			StartComponent,
		},
	}
</script>
