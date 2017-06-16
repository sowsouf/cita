<template>
	<div class="invocations container">
		<h2>Ajouter une invocation</h2>
		<div class="form-container row">
			<form class="col s12">
				<div class="col s12">
					<label for="francais">Invocation en français</label>
					<textarea v-model="invocations.francais" id="francais" class="materialize-textarea"/></textarea>
					<hr>
				</div>
				<div class="col s12">
					<label for="phonetique">Invocation en phonétique</label>
					<textarea v-model="invocations.phonetique" id="phonetique" class="materialize-textarea"/></textarea>
					<hr>
				</div>
				<div class="col s12" id="addChapter">
					<label for="chapter" class="col s10 no-padding">Chapitre</label>
					<div class="col s2">
						<button class="btn btn-circle btn-top right" @click="addChapterEvent(true)"><i class="fa fa-plus"></i></button>
					</div>
					<div  v-if="!addChapter">
						<div class="select-group">
							<ul class="select-group-ul">
								<li v-for="chapitre in chapitres" :class="{'selected' : invocations.chapitre === chapitre.id}" @click="selectChapter(chapitre)">
									{{ chapitre.title }}
								</li>
							</ul>
						</div>
						<hr>
					</div>
					<div v-if="addChapter" id="addChapterContainer">
						<label for="titre">Titre du chapitre</label>
						<input type="text" v-model="chapter.title" id="titre">
						<hr>
						<button class="btn btn-circle btn-bottom btn-right" @click="addChapterEvent(false)"><i class="fa fa-times"></i></button>
						<button class="btn btn-circle btn-bottom btn-right" @click="addTheChapter()"><i class="fa fa-plus"></i></button>
					</div>
				</div>

				<div class="col s12" v-if="!addChapter">
					<button class="btn btn-block" @click="addDuaa()">Ajouter l'invocation</button>
				</div>
			</form>

		</div>

	</div>

</template>

<script>

	import Api 	from '../../../utils/api'
	import Store 	from '../../../utils/store'

	let api = new Api();

	export default {

		name: 'invocations',

		created() {
			this.findAllChapter();
		},

		data () {
			return {
				invocations 	: this.initInvocation(),
				chapitres 	: [],
				addChapter 	: false,
				chapter		: {"title": "", "numero": null}
			}
		},

		methods: {
			findAllChapter() {
				api.get('/chapitres').then(response => {
					this.chapitres = response;
				}).catch(error => {
					console.error(error);
				})
			},

			initInvocation() {
				return {
					"francais": '',
					"phonetique": "",
					"apprise": 0,
					"chapitre": ""
				}
			},

			selectChapter(chapitre) {
				this.invocations.chapitre = chapitre.id;
			},

			addChapterEvent(bool) {
				this.addChapter = bool;
			},

			addTheChapter() {
				api.post('/chapitres', this.chapter).then(response => {
					this.findAllChapter();
					this.chapter = {"title": "", "numero": null};
				}).catch(error => {
					console.error(error);
				})
			},

			addDuaa() {
				this.invocations.phonetique = this.invocations.phonetique.replaceAll('c', '`');
				for(var index in this.invocations) {
					var attr = this.invocations[index];
					if (attr !== 0 && (!attr || attr.trim() === '')) {
						alert("Tous les champs sont requis");
						return (false);
					}
				}
				api.post('/invocations', this.invocations).then(response => {
					this.invocations = this.initInvocation();
				}).catch(error => {
					console.error(error);
				})
			}

		}
	}
</script>
<style type="text/css" src="./invocations.css"></style>
