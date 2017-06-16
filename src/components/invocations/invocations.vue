<template>
	<div class="invocations">
		<span class="hide">{{isLoad = (chapter && invocations) ? true : false}}</span>
		<div class="preloader" v-if="!isLoad"></div>

		<div class="ul-container" :class="{'isLoad': isLoad}">

			<h2>{{(chapter) ? chapter.title : ''}}</h2>

			<ul class="ul-list">
				<li class="ul-list-item" v-for="invocation in invocations">
					<div class="fr-doua">
						{{invocation.francais}}
					</div>
					<div class="ph-doua">
						{{invocation.phonetique}}
					</div>
					<hr>
				</li>
			</ul>

		</div>

	</div>

</template>

<script>

	import Api 	from '../../utils/api'
	import Store 	from '../../utils/store'

	let api = new Api();

	export default {

		name: 'invocations',

		props: ['invocations', 'chapter'],

		created() {
			//this.findAll();
		},

		data () {
			return {
				//invocations 	: [],
				isLoad 	: false,
				store 		: Store
			}
		},

		methods: {
			findAll() {
				api.get('/invocations').then(response => {
					this.invocations = response;
					this.isLoad = true;
				}).catch(error => {
					console.error(error);
				})
			}
		}
	}
</script>
<style type="text/css" src="./invocations.css"></style>
