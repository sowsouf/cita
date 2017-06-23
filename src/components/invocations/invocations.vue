<template>
	<div class="invocations">
		<v-touch v-on:swiperight="openSidebar">

			{{getInvocations()}}

			<div class="preloader" v-if="!isLoad"></div>

			<div class="ul-container" :class="{'isLoad': isLoad}">

				<h2>{{(chapitres) ? chapitres.title : ''}}</h2>

				<ul class="ul-list">
					<li class="ul-list-item" v-for="invocation in invocations" >
						<v-touch v-on:swipeleft="openOptions(invocation)" v-on:tap="closeOptions(0)">
							<div class="main-content" :class="{'open-options': invocation.id === opened}">
								<div class="fr-doua">
									{{invocation.francais}}
								</div>
								<div class="ph-doua">
									{{invocation.phonetique}}
								</div>
							</div>
						</v-touch>
						<div class="share-content" :class="{'open-options': invocation.id === opened}">
							<a :href="shareSms(invocation)"><i class="fa fa-share fa-2x"></i></a>
						</div>
						<hr>
					</li>
				</ul>



			</div>
		</v-touch>
	</div>

</template>

<script>

	import Api 	from '../../utils/api'
	import Store 	from '../../utils/store'

	let api = new Api();

	export default {

		name: 'invocations',

		data () {
			return {
				isLoad 		: true,
				opened 	: 0,
				invocations 	: Store.invocationsByChap,
				chapitres 	: {"id" : 0},
			}
		},

		methods: {

			getInvocations() {
				if (this.$route.params.id !== this.chapitres.id) {
					this.chapitres 		= Store.chapitres.findChapterById(this.$route.params.id);
					this.invocations 	= Store.invocations.findOneById(this.$route.params.id);
					Store.change = false;
				}

			},

			shareSms(invocation) {
				return ("sms:?&body=Invocation de la catégorie \"" + this.chapitres.title + "\"%0A%0A" + invocation.francais  + "%0A%0A" + invocation.phonetique);
			},

			openOptions(invocation) {
				this.opened = invocation.id;
			},

			closeOptions(number) {
				this.opened = number;
			},

			openSidebar() {
				let sidebar = $("#sideMenu");
				$(sidebar).addClass('open');
				$(".toggle-sidebar").addClass('change open');
				$(".main-body").addClass('open');
				this.closeOptions(0);
			}
		}
	}

</script>
<style type="text/css" src="./invocations.css"></style>
