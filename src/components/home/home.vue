<template>
	<div class="home">

		<div class="top-nav">
			<v-touch v-on:tap="reload">
				<div class="refresh">
					<i class="fa fa-refresh"></i>
				</div>
			</v-touch>
		</div>

		<sidebar @findOneWhere="findOneWhere"></sidebar>

		<v-touch v-on:swipeleft="closeSidebar" v-on:swiperight="openSidebar">

			<div class="main-body open isLoad">
				<div v-if="!chapter && home">
					<div id="home" class="hide">
						<h2>Pour commencer, choisir une catégorie<br />
							<i class="fa fa-arrow-left fa-5x"></i>
						</h2>
					</div>
					<div class="mobile-home">
						<div class="home-img">
							<img src="../../assets/mosque (2).png" alt="Home logo" height="128" width="128">
							<div class="img-box"></div>
						</div>
						<p>La citadelle du musulman</p>
						<small>Pour commencer, choisir une catégorie <br /> <i class="fa fa-arrow-left"></i></small>
						<div class="footer">
							<i class="fa fa-copyright"></i> <a href="sofiane-akbly.890m.com">Sofiane Akbly</a>
						</div>
					</div>
				</div>
				<div v-else>
					<invocations :invocations="invocations" :chapter="chapter"></invocations>
				</div>

				<router-view></router-view>
			</div>

		</v-touch>

	</div>
</template>

<script>

	import Sidebar 	from './../sidebar/sidebar'
	import Invocations 	from './../invocations/invocations'

	import Api 		from '../../utils/api'
	import Store 		from '../../utils/store'

	let api = new Api();

	export default {

		name: 'home',

		created() {

		},

		data () {
			return {
				invocations 	: null,
				chapter 	: null,
				home 		: true
			}
		},

		methods: {
			findOneWhere(chapitre) {
				this.chapter = null;
				this.invocations = null;
				this.home = false;
				if (!chapitre) {
					Store.click = true;
					this.home = true;
					this.invocations = null;
					return (false);
				}
				api.get('/invchap/' + chapitre.id).then(response => {
					Store.click = true;
					this.invocations = response;
					this.chapter = chapitre;
					if ($(window).width() < 490) {
						let sidebar = $("#sideMenu");
						$(sidebar).toggleClass('open');
						$(".toggle-sidebar").toggleClass('change open');
						$(".main-body").toggleClass('open');
					}
				}).catch(error => {
					console.error(error);
				})
			},

			closeSidebar() {
				let sidebar = $("#sideMenu");
				$(sidebar).removeClass('open');
				$(".toggle-sidebar").removeClass('change open');
				$(".main-body").removeClass('open');
			},

			openSidebar() {
				let sidebar = $("#sideMenu");
				$(sidebar).addClass('open');
				$(".toggle-sidebar").addClass('change open');
				$(".main-body").addClass('open');
			},

			reload() {
				$(".fa-refresh").addClass("fa-spin");
				setTimeout(function(){
					window.location.reload();
				}, 500);
			}
		},

		components: {
			Sidebar,
			Invocations
		}
	}
</script>
<style type="text/css" src="./home.css"></style>
