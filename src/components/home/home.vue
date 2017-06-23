<template>
	<div class="home">

		<div class="top-nav">
			<v-touch v-on:tap="reload">
				<div class="refresh">
					<i class="fa fa-refresh"></i>
				</div>
			</v-touch>
		</div>

		<v-touch v-on:swipeleft="closeSidebar" v-on:swiperight="openSidebar">

			<div class="main-body open isLoad">
				<div v-if="!store.curChapitres && home">
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
							<span>Développé par <a href="sofiane-akbly.890m.com">Sofiane Akbly</a> <i class="fa fa-copyright"></i></span>
						</div>
					</div>
				</div>
				<router-view></router-view>

			</div>

		</v-touch>

	</div>
</template>

<script>

	import Store 		from '../../utils/store'

	export default {

		name: 'home',

		data () {
			return {
				home 		: true,
				store 		: Store
			}
		},

		methods: {

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
		}
	}

</script>
<style type="text/css" src="./home.css"></style>
