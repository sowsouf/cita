<template>
	<div id="app">
		<sidebar></sidebar>
		<home></home>
	</div>
</template>

<script>

	import Home 		from './components/home/home'
	import Sidebar 	from './components/sidebar/sidebar'

	export default {
		name: 'app',

		components: {
			Home,
			Sidebar
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		/*margin-top: 60px;*/
	}
</style>
