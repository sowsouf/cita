<template>
	<div class="sidebar">

	<v-touch v-on:swipeleft="closeSidebar">
			<div class="sidenav open" id="sideMenu">

				<div class="preloader" v-if="!isLoad"></div>


				<div class="side-header">
					<div class="row">
						<div class="col s12">
							<div class="side-item-icon" @click="findOneWhere(null)">
								<img src="../../assets/mosque (1).png" alt="Side logo">
							</div>
						</div>
						<div class="col s6 hide">
							<div class="side-item-icon">
								<i class="fa fa-plus fa-3x"></i>
							</div>
						</div>
					</div>
				</div>

				<div class="side-links" :class="{'isLoad': isLoad}">
					<ul>
						<li v-for="chapitre in chapitres" @click="findOneWhere(chapitre)">
							{{chapitre.title}}
						</li>
					</ul>
				</div>

			</div>

			<div class="toggle-sidebar open change" data-sidebar="#sideMenu" @click="toggleSidebar()">
				<div class="bar1"></div>
				<div class="bar2"></div>
				<div class="bar3"></div>
			</div>
		</v-touch>
	</div>

</template>

<script>

	import Api 	from '../../utils/api'
	import Store 	from '../../utils/store'

	let api = new Api();

	export default {
		name: 'sidebar',

		created() {
			this.findAll();
		},

		data () {
			return {
				chapitres 	: {},
				isLoad 	: false
			}
		},

		methods: {
			findAll() {
				api.get('/chapitres').then(response => {
					this.chapitres = response;
					this.isLoad = true;
					setTimeout(function() {
						$(".startup").removeClass('open');
					}, 500);
				}).catch(error => {
					console.error(error);
				})
			},

			findOneWhere(chapitre) {
				if (Store.click) {
					Store.click = false;
					this.$emit('findOneWhere', chapitre);
				}
			},

			toggleSidebar() {
				let sidebar = $("#sideMenu");
				$(sidebar).toggleClass('open');
				$(".toggle-sidebar").toggleClass('change open');
				$(".main-body").toggleClass('open');
			},

			closeSidebar() {
				let sidebar = $("#sideMenu");
				$(sidebar).removeClass('open');
				$(".toggle-sidebar").removeClass('change open');
				$(".main-body").removeClass('open');
			}

		}
	}
</script>

<style type="text/css" src="./sidebar.css"></style>
