<template>
	<div id="app">
		<router-view />
	</div>
</template>

<style lang="scss">
	html {
		height: 100vh;
		overflow: hidden;
	}

	#app {
		font-family: 'Ubuntu', Lato, Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		height: 100vh;
	}

	* {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
</style>
